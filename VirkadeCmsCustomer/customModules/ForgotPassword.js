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
        this.clickNext = this.clickNext.bind(this)
        this.nextPage = this.nextPage.bind(this)
    }

    state = {
        validatorMsg: ''
    }

    updateInput = (data) => {
        this.props.actions(data)
        this.validateInput(data, false)
    }

    clickNext() {
        let {username, authToken} = this.props.user;
        let isValid = this.validateInput(this.props.user)
        if (isValid && username != authToken.username){
            DatabaseAPI.getUserByUserName(this.props.user.username, this.nextPage)
        } else if (isValid){
            this.props.navigation.navigate('BasicUser')
        }
        
    }
    nextPage(data, error){
        if (data && data.getUserByUserName) {
            Alert.alert('::error::','\nusername already exists, looks like someone beat you to it :(')
        } else {
            this.props.navigation.navigate('BasicUser')
        }
    }

    validateInput(data, isAlert = true) {
        let { username, password, securityQ, securityA } = data;
        let msg = '';
        valid = true
        if (username != undefined && (username == "" || username.length < 6)){
            msg = 'username is too short'
            valid = false;
        } else if (password != undefined  && (password == "" || password.length < 8)) {
            msg = 'password is too short'
            valid = false;
        } else if (securityQ != undefined  && securityQ == "") {
            msg = 'security question cannot be empty'
            valid = false;
        } else if (securityA != undefined  && securityA == "") {
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
                                <Text style={style.h1}>::create account::</Text>
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>username:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(username) =>
                                    this.updateInput({ username: username })} value={this.props.user.username} />
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>password:</Text>
                                <TextInput style={style.input} secureTextEntry={true} underlineColorAndroid="#9fff80" onChangeText={(password) =>
                                    this.updateInput({ password: password })} value={this.props.user.password} />
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>security q:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityQ) =>
                                    this.updateInput({ securityQ: securityQ })} value={this.props.user.securityQ} />
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>security a:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityA) =>
                                    this.updateInput({ securityA: securityA })} value={this.props.user.securityA} />
                            </View>
                            <View style={style.col}>
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