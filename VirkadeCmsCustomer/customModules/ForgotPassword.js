import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';
import Header from './Header.js'
import { bindActionCreators } from 'redux';
import userAction from './reduxActions/UserAction';
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'

class BasicAccount extends Component {

    constructor(props) {
        super(props)
        this.setSecurityQ = this.setSecurityQ.bind(this)
        this.checkSecurityA = this.checkSecurityA.bind(this)
        this.nextPage = this.nextPage.bind(this)
    }

    state = {
        validatorMsg: '',
        step: 1
    }

    updateInput = (data) => {
        this.props.actions(data)
        this.validateInput(data, false)
    }

    setSecurityQ(data, error) {
        if (data && data.getSecurityQ) {
            this.updateInput({ "securityQuestion": data.getSecurityQ })
            this.setState({ step: 2 });
        } else {
            Alert.alert('::error::', `\nhmmm... \nlooks like something went wrong.  \n${error[0].message}`)
        }
    }
    checkSecurityA(data, error) {
        if (data && data.checkSecurityA) {
            this.updateInput({ "securityAnswer": data.checkSecurityA })
            this.setState({ step: 3 });
        } else {
            Alert.alert('::error::', `\nhmmm... \nlooks like something went wrong.  \n${error[0].message}`)
        }
    }
    nextPage(data, error) {
        if (data && data.changePassword) {
            Alert.alert('::info::', '\npassword update successful')
            this.props.navigation.navigate('Splash')
        } else {
            Alert.alert('::error::', `\nhmmm... \nlooks like something went wrong.  \n${error[0].message}`)
            this.setState({ step: 1 });
        }
    }
    validateInput(data, isAlert = true) {
        let { username, password, securityQuestion, securityA } = data;
        let msg = '';
        valid = true
        if (username != undefined && (username == "" || username.length < 6)) {
            msg = 'username is too short'
            valid = false;
        } else if (password != undefined && (password == "" || password.length < 8)) {
            msg = 'password is too short'
            valid = false;
        } else if (securityQuestion != undefined && securityQuestion == "") {
            msg = 'security question cannot be empty'
            valid = false;
        } else if (securityA != undefined && securityA == "") {
            msg = 'security answer cannot be empty'
            valid = false;
        } else if (this.props.user.authToken.username === username) {
            msg = `you are logged in as ${username} \nchange username if you want to create a new account`
        }
        this.setState({ validatorMsg: msg })

        if (isAlert && !valid) {
            Alert.alert('::error::', msg)
        }
        return valid;

    }

    render() {
        return (
            <ScrollView keyboardDismissMode='on-drag'>
                <View style={style.wrapper}>
                    <Header />
                    <View style={style.body}>
                        <View style={style.spacer}></View>
                        <View style={style.main}>
                            <View style={style.h2}>
                                <Text style={style.label}>{this.state.validatorMsg}</Text>
                            </View>
                            <View style={style.colFirst}>
                                <Text style={style.h1}>::recover account::</Text>
                            </View>
                            {this.state.step == 1 &&
                                <View style={style.col}>
                                    <Text style={style.label}>username:</Text>
                                    <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(username) =>
                                        this.updateInput({ username: username })} value={this.props.user.username} />
                                </View>
                            }
                            {this.state.step == 2 &&
                                <View style={style.col}>
                                    <Text style={style.label} underlineColorAndroid="#9fff80">security q: {this.props.user.securityQuestion}</Text>
                                </View>
                            }
                            {this.state.step == 2 &&
                                <View style={style.col}>
                                    <Text style={style.label}>security a:</Text>
                                    <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityAnswer) =>
                                        this.updateInput({ securityAnswer: securityAnswer })} value={this.props.user.securityAnswer} />
                                </View>
                            }
                            {this.state.step == 3 &&
                                <View style={style.col}>
                                    <Text style={style.label}>password:</Text>
                                    <TextInput style={style.input} secureTextEntry={true} underlineColorAndroid="#9fff80" onChangeText={(password) =>
                                        this.updateInput({ password: password })} value={this.props.user.password} />
                                </View>
                            }
                            {this.state.step == 1 &&
                                <View style={style.col}>
                                    <TouchableNativeFeedback onPress={() => validateInput(this.props.user.username) && DatabaseAPI.getSecurityQ(this.props.user.username, this.setSecurityQ)}>
                                        <View style={style.next}>
                                            <Text style={style.label}>get security question</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            }
                            {this.state.step == 2 &&
                                <View style={style.col}>
                                    <TouchableNativeFeedback onPress={() => validateInput(this.props.user.securityAnswer) && DatabaseAPI.checkSecurityA(this.props.user, this.checkSecurityA)}>
                                        <View style={style.next}>
                                            <Text style={style.label}>submit security answer</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            }
                            {this.state.step == 3 &&
                                <View style={style.col}>
                                    <TouchableNativeFeedback onPress={() => validateInput(this.props.user.password) && DatabaseAPI.changePassword(this.props.user, this.nextPage)}>
                                        <View style={style.next}>
                                            <Text style={style.label}>change password</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            }
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicAccount);

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        minHeight: 900
    },
    body: {
        flexDirection: 'row',
        flex: 0.75,
        backgroundColor: '#001a00',
    },
    main: {
        flexDirection: 'column',
        flex: 1
    },
    h1: {
        fontSize: 26,
        alignSelf: 'center',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0'
    },
    h2: {
        fontSize: 20,
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
    label: {
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#9fff80',
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    spacer: {
        flex: 0.1,
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