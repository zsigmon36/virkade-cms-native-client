import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native';
import Header from './Header.js'
import { bindActionCreators } from 'redux';
import validator from 'validator';
import userAction from './reduxActions/UserAction'
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'

class BasicUser extends Component {

    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    state = {
        validatorMsg: ''
    }

    updateInput(data) {
        this.props.actions(data)
        this.validateInput(data, false)
    }

    clickNext() {
        let user = this.props.user;
        if (this.validateInput(user)){
            if (user.username == user.authToken.username){
                data = {'signIn': {
                    'userName': user.authToken.username, 
                    'token': user.authToken.token, 
                    'createdDate': user.authToken.createdDate
                    }
                }
                this.nextPage(data);
            } else {
                DatabaseAPI.createNewUser(user, this.signIn)
            } 
        }         
    }
    nextPage(data, error){
        if (data && data.signIn) {
            let {username, token, createdDate} = data.signIn
            this.updateInput({'authToken' : {
                'token': token,
                'createdDate': createdDate,
                'username': username
            }})
            this.props.navigation.navigate('PersonalUser') 
        } else {
            Alert.alert('::error::','\nLooks like something went wrong :(')

        }
    }

    validateInput = (data, isAlert = true) => {
        let { firstName, lastName, emailAddress } = data;
        let msg = '';
        let isValid = true;
        if (firstName != undefined && firstName == "" ) {
            msg = 'first name cannot be empty'
            isValid = false;
        } else if (lastName != undefined && lastName == "") {
            msg = 'last name cannot be empty'
            isValid = false;
        } else if (emailAddress != undefined && !validator.isEmail(emailAddress)) {
            msg = 'email address is not a valid'
            isValid = false;
        }
        this.setState({ validatorMsg: msg })

        if (isAlert && !isValid) {
            Alert.alert('::error::', msg)
        }
        return isValid;
    }

    signIn(data, error) {
        if (data && data.createNewUser) {
            let user = data.createNewUser;
            let userIdValue = user.userId
            this.updateInput({"userId" : userIdValue})
            let username = this.props.user.username;
            let password = this.props.user.password;
            DatabaseAPI.signIn(username, password, this.nextPage)  
        } else {
            Alert.alert('::error::','\nUser already exists, Looks like someone beat you to it :(')
        }
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
                                <Text style={style.h1}>::basic info::</Text>
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>first name:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(firstName) =>
                                    this.updateInput({ "firstName": firstName })} value={this.props.user.firstName} />
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>last name:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(lastName) =>
                                    this.updateInput({ "lastName": lastName })} value={this.props.user.lastName} />
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>email address:</Text>
                                <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(emailAddress) =>
                                    this.updateInput({ "emailAddress": emailAddress })} value={this.props.user.emailAddress} />
                            </View>
                            <View style={style.col}>
                                <TouchableNativeFeedback onPress={() => this.clickNext()}>
                                    <View style={style.next}>
                                        <Text style={style.label}>create account</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicUser);

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
    },
    label: {
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