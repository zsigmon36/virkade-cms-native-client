import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  Alert,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import Header from './Header.js';
import SignatureCapture from 'react-native-signature-capture';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import userAction from './reduxActions/UserAction';
import {DatabaseAPI} from './dataAccess/DatabaseAPI.js';
import Loader from './Loader.js';
import style from '../static/styles.js';

class TermsConditions extends Component {
  constructor(props) {
    super(props);
    this.pSigRef = React.createRef();
    this.gSigRef = React.createRef();
    this.nextPage = this.nextPage.bind(this);
    this.setTCContent = this.setTCContent.bind(this);
    this.resetSign = this.resetSign.bind(this);
    this.resetSign = this.resetSign.bind(this);
    this.onPSigSaveEvent = this.onPSigSaveEvent.bind(this);
    this.onPSigDragEvent = this.onPSigDragEvent.bind(this);
    this.onGSigSaveEvent = this.onGSigSaveEvent.bind(this);
    this.onGSigDragEvent = this.onGSigDragEvent.bind(this);
  }

  state = {
    agree: this.props.user.tcAgree ? '[X]' : '[ ]',
    pSig: undefined,
    gSig: undefined,
    minor: this.props.user.minor ? '[X]' : '[ ]',
    loading: true,
    tandc: {content: '  ::not found::', docId: 0},
  };

  componentDidMount() {
    let user = this.props.user;
    DatabaseAPI.getLatestDocumentByType(
      user,
      user.tcTypeCode,
      this.setTCContent,
    );
  }

  setTCContent(data, error) {
    let user = this.props.user;
    if (data && data.getLatestDocumentByType) {
      this.setState({tandc: data.getLatestDocumentByType});
      if (user.ActiveTCLegal && user.ActiveTCLegal.pSig) {
        this.setState({pSig: user.ActiveTCLegal.pSig});
        this.pSigRef.current.setState({signed: true});
      }
      if (user.minor && user.ActiveTCLegal && user.ActiveTCLegal.gSig) {
        this.setState({gSig: user.ActiveTCLegal.gSig});
        this.gSigRef.current.setState({signed: true});
      }
    } else if (error) {
      Alert.alert(
        '::error::',
        `\nhmmm... \nlooks like something went wrong.  \n${error[0].message}`,
      );
    } else {
      Alert.alert('::error::', '\nhmmm... \nlooks like something went wrong.');
    }
    this.loading(false);
  }

  loading(data) {
    let loading = data || false;
    this.setState({loading: loading});
    return true;
  }

  updateInput(data) {
    this.props.actions(data);
  }

  agreeCheckBox = () => {
    if (this.state.agree === '[ ]') {
      this.updateInput({tcAgree: true});
      this.setState({agree: '[X]'});
    } else {
      this.updateInput({tcAgree: false});
      this.setState({agree: '[ ]'});
    }
  };

  minorCheckBox = () => {
    if (this.state.minor === '[ ]') {
      this.updateInput({minor: true});
      this.setState({minor: '[X]'});
    } else {
      this.updateInput({minor: false});
      this.setState({minor: '[ ]'});
    }
  };

  clickNext() {
    this.loading(true);
    let user = this.props.user;
    let hasPSig = false;
    let pSig = this.state.pSig;
    if (pSig) {
      hasPSig = this.pSigRef.current.state.signed;
    }
    let hasGSig = false;
    let gSig = this.state.gSig;
    if (gSig) {
      hasGSig = this.gSigRef.current.state.signed;
    }
    if (user.tcAgree && hasPSig && (!user.minor || (user.minor && hasGSig))) {
      let docId = this.state.tandc.docId;
      DatabaseAPI.addUserLegalDoc(
        user,
        user.tcTypeCode,
        docId,
        pSig,
        gSig,
        user.minor,
        true,
        this.nextPage,
      );
    } else if (!user.tcAgree) {
      this.loading(false);
      Alert.alert(
        '::info::',
        '\nyou must agree to the terms and conditions to continue',
      );
    } else if (!hasPSig) {
      this.loading(false);
      Alert.alert('::info::', '\nyou must provide a signature to continue');
    } else {
      this.loading(false);
      Alert.alert('::info::', '\nyou must have your guardian sign to continue');
    }
  }

  nextPage(data, error) {
    if (data && data.addUserLegalDoc) {
      this.props.navigation.navigate('LimitedLiable');
    } else if (error) {
      Alert.alert(
        '::error::',
        `\nhmmm... \nlooks like something went wrong.  \n${error[0].message}`,
      );
    } else {
      Alert.alert('::error::', '\nhmmm... \nlooks like something went wrong.');
    }
    this.loading(false);
  }

  saveSign(ref) {
    ref.current.saveImage();
  }

  resetSign(ref) {
    ref.current.setState({signed: false});
    ref.current.resetImage();
    if (ref === this.pSigRef) {
      this.setState({pSig: undefined});
    } else {
      this.setState({gSig: undefined});
    }
  }

  onPSigSaveEvent(result) {
    if (this.pSigRef.current.state.signed && result) {
      this.setState({pSig: result.encoded});
    }
  }
  onPSigDragEvent() {
    this.pSigRef.current.setState({signed: true});
  }

  onGSigSaveEvent(result) {
    if (this.gSigRef.current.state.signed && result) {
      this.setState({gSig: result.encoded});
    }
  }
  onGSigDragEvent() {
    this.gSigRef.current.setState({signed: true});
  }

  render() {
    let tc = this.state.tandc.content;
    let user = this.props.user;
    return (
      <ScrollView style={style.wrapper}>
        <Loader loading={this.state.loading} />
        <Header />
        <View style={style.body}>
          <View style={style.spacer} />
          <View style={style.main}>
            <View style={style.colFirst}>
              <Text style={style.h1}>::terms & conditions::</Text>
            </View>
            <View style={[style.col, style.border, style.padit]}>
              <Text style={style.label}> {tc} </Text>
            </View>
            <View style={[style.col, style.edgeSpace]}>
              <Text style={style.checkBox} onPress={this.agreeCheckBox}>
                {this.state.agree} do you agree to the terms and conditions?
              </Text>
            </View>
            <View style={style.col}>
              <Text>please sign in box</Text>
            </View>
            <View style={[style.edgeSpace, style.sigAreaWrapper]}>
              <SignatureCapture
                style={style.sigArea}
                ref={this.pSigRef}
                onSaveEvent={this.onPSigSaveEvent}
                onDragEvent={this.onPSigDragEvent}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                backgroundColor="transparent"
                strokeColor="#9fff80"
                minStrokeWidth={4}
                maxStrokeWidth={4}
              />
            </View>
            <View style={[style.colSimple]}>
              <TouchableNativeFeedback
                onPress={() => {
                  this.saveSign(this.pSigRef);
                }}>
                <View style={style.sigButton}>
                  <Text style={style.label}>save</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  this.resetSign(this.pSigRef);
                }}>
                <View style={style.sigButton}>
                  <Text style={style.label}>reset</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={style.colFirst}>
              <Text style={style.h4}>{this.state.pSig ? '[current]' : ''}</Text>
            </View>
            <Image
              style={this.state.pSig ? style.sigDisplayWrapper : {}}
              source={{
                uri: `data:image/png;base64,${this.state.pSig}`,
              }}
            />
            <View style={[style.col, style.edgeSpace]}>
              <Text style={style.checkBox} onPress={this.minorCheckBox}>
                {this.state.minor} are you under 18 years old or otherwise
                guardianship?
              </Text>
            </View>
            {user.minor && (
              <View>
                <View style={style.col}>
                  <Text>guardian signature in box</Text>
                </View>
                <View style={[style.edgeSpace, style.sigAreaWrapper]}>
                  <SignatureCapture
                    style={style.sigArea}
                    ref={this.gSigRef}
                    onSaveEvent={this.onGSigSaveEvent}
                    onDragEvent={this.onGSigDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    backgroundColor="transparent"
                    strokeColor="#9fff80"
                    minStrokeWidth={4}
                    maxStrokeWidth={4}
                  />
                </View>
                <View style={[style.colSimple]}>
                  <TouchableNativeFeedback
                    onPress={() => {
                      this.saveSign(this.gSigRef);
                    }}>
                    <View style={style.sigButton}>
                      <Text style={style.label}>save</Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                    onPress={() => {
                      this.resetSign(this.gSigRef);
                    }}>
                    <View style={style.sigButton}>
                      <Text style={style.label}>reset</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
                <View style={style.colFirst}>
                  <Text style={style.h4}>
                    {this.state.gSig ? '[current]' : ''}
                  </Text>
                </View>
                <Image
                  style={this.state.gSig ? style.sigDisplayWrapper : {}}
                  source={{
                    uri: `data:image/png;base64,${this.state.gSig}`,
                  }}
                />
              </View>
            )}
            <View style={[style.col, style.edgeSpace]}>
              <TouchableNativeFeedback onPress={() => this.clickNext()}>
                <View style={style.next}>
                  <Text style={style.label}>next</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={style.col}>
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.goBack()}>
                <View style={style.next}>
                  <Text style={style.label}>back</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={style.spacer} />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions);
