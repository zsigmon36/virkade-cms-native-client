import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';
import Header from './Header.js'
import { bindActionCreators } from 'redux';
import basicAccountAction from './reduxActions/BasicAccountAction';
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'

class BasicAccount extends Component {

    constructor(props) {
        super(props)
        this.clickNext = this.clickNext.bind(this)
    }

    state = {
        validatorMsg: ''
    }

    updateInput(data) {
        this.props.actions(data)
        this.validateInput(false)
    }

    clickNext(data) {
        if (data.getUserByUserName) {
            alert('username already exists, \n looks like someone beat you to it :(')
        } else {
            this.props.navigation.navigate('BasicUser')
        }
    }

    validateInput(isAlert = true) {
        let { username, password, securityQ, securityA } = this.props.basicAccount;
        let msg = '';
        valid = true;
        if (!username || username.length < 6) {
            msg = 'username is too short'
            valid = false;
        } else if (!password || password.length < 8) {
            msg = 'password is too short'
            valid = false;
        } else if (!securityQ) {
            msg = 'securityQ cannot be empty'
            valid = false;
        } else if (!securityA) {
            msg = 'securityA cannot be empty'
            valid = false;
        }
        this.setState({ validatorMsg: msg })

        if (isAlert && !valid) {
            alert(msg)
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
                                <Text style={style.h1}>::create account::</Text>
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>username:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(username) =>
                                    this.updateInput({ username: username })} value={this.props.basicAccount.username} />
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>password:</Text>
                                <TextInput style={style.input} secureTextEntry={true} underlineColorAndroid="#9fff80" onChangeText={(password) =>
                                    this.updateInput({ password: password })} value={this.props.basicAccount.password} />
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>security q:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityQ) =>
                                    this.updateInput({ securityQ: securityQ })} value={this.props.basicAccount.securityQ} />
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>security a:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityA) =>
                                    this.updateInput({ securityA: securityA })} value={this.props.basicAccount.securityA} />
                            </View>
                            <View style={style.col}>
                                <TouchableNativeFeedback onPress={() => this.validateInput() && DatabaseAPI.getUserByUserName(this.props.basicAccount.username, this.clickNext)}>
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
        basicAccount: state.basicAccount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(basicAccountAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicAccount);

const style = StyleSheet.create({
    wrapper: {
        flex: 1
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
        color: '#9fff80',
        fontSize: 26,
        alignSelf: 'center',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0'
    },
    h2: {
        color: '#9fff80',
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
        //alignSelf: 'baseline'
        //alignContent: 'center'
        //justifyContent: 'center'
    },
    label: {
        color: '#9fff80',
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