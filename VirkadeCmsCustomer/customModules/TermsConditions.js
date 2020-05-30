import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableNativeFeedback,
    ScrollView,
} from 'react-native';
import Header from './Header.js'
import Markdown from 'react-native-markdown-renderer';
import { tandc } from '../static/tandc'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './reduxActions/UserAction'
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'

class TermsConditions extends Component {
    
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this);
    }
    
    state = {
        agree: '[ ]',
    } 
    
    updateInput(data) {
        this.props.actions(data)
    }

    agreeCheckBox = () => {
        if (this.state.agree == '[ ]') {
            this.updateInput({tcAgree:true})
            this.setState({ agree: '[X]' })
        } else {
            this.updateInput({tcAgree:false})
            this.setState({ agree: '[ ]' })
        }
    }

    clickNext() {
        let user = this.props.user
        if (user.tcAgree) {
            DatabaseAPI.addUserLegalDoc(user, user.tcTypeCode, true, this.nextPage)
        } else {
            Alert.alert('::info::','\nyou must agree to the terms and conditions to continue')
        }
        
    }

    nextPage(data, error) {
        if (data && data.addUserLegalDoc) {
            this.props.navigation.navigate('LimitedLiable')
        } else {
            Alert.alert('::error::',`\nhmmm... \nlooks like something went wrong.  \n${error[0].message}`)
        }
    }

    render() {
        let termsAndConds = tandc.enUS;
        console.log(tandc)
        return (
            <ScrollView >
                <View style={style.wrapper}>
                    <Header />
                    <View style={style.body}>
                        <View style={style.spacer}></View>
                        <View style={style.main}>
                            <View style={style.colFirst}>
                                <Text style={style.h1}>::terms & conditions::</Text>
                            </View>
                            <View style={[style.col, style.border, style.padit]}>
                                <Markdown style={mdStyle}>{termsAndConds}</Markdown>
                            </View>
                            <View style={[style.col, style.edgeSpace]}>
                                <Text style={style.checkBox} onPress={this.agreeCheckBox}> {this.state.agree} do you agree to the terms and conditions?</Text>
                            </View>
                            <View style={[style.col, style.edgeSpace]}>
                                <TouchableNativeFeedback onPress={() => this.clickNext()}>
                                    <View style={style.next}>
                                        <Text style={style.label}>next</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                        <View style={style.spacer}></View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions);

const mdStyle = StyleSheet.create({
    text: {
        color: '#9fff80',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0',
    },
    listOrderedItemIcon: {
        color: '#9fff80',
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 34,
    },
    listUnorderedItemIcon: {
        color: '#9fff80',
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 34,
    },
  });


const style = StyleSheet.create({

    wrapper: {
        flex: 0,
        minHeight: 850
    },
    body: {
        flexDirection: 'row',
        flex: 0,
        backgroundColor: '#001a00',
    },
    main: {
        flexDirection: 'column',
        flex: 0
    },
    h1: {
        color: '#9fff80',
        fontSize: 21,
        alignSelf: 'center',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0'
    },
    colFirst: {
        marginTop: 10,
    },
    col: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    edgeSpace: {
        marginLeft: 20,
        marginRight: 20
    },
    label: {
        color: '#9fff80',
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    checkBox: {
        color: '#9fff80',
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    input: {
        flex: 1,
        color: '#9fff80',
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    textArea: {
        height: 100,
        borderColor: '#9fff80',
        borderWidth: 2,
    },
    spacer: {
        flex: 0.1,
    },
    padit: {
        padding: 10,
    },
    border: {
        borderWidth: 2,
        borderColor: '#9fff80',
    },
    next: {
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#9fff80',
        borderWidth: 2,
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})