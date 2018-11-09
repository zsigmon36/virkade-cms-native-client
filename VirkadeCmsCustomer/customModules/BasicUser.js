import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native';
import Header from './Header.js'
import { bindActionCreators } from 'redux';
import validator from 'validator';
import basicUserAction from './reduxActions/BasicUserAction'
import {DatabaseAPI} from './dataAccess/DatabaseAPI.js'

class BasicUser extends Component {

    constructor(props){
        super(props)
    }
    updateInput(data){
        this.props.actions(data)
    }


    clickNext(){
        let {firstName, lastName, emailAddress} = this.props.basicUser;
        let {username,password, securityQ, securityA} = this.props.basicAccount;
        this.validateInput() && DatabaseAPI.createNewUser(emailAddress, username, password, 
            securityQ, securityA, firstName, lastName, this.nextPage)
    }

    validateInput(){
        let {firstName, lastName, emailAddress} = this.props.basicUser;
        if (!firstName){
            alert('firstName cannot be empty')
            return false;
        }
        if (!lastName){
            alert('lastName cannot be empty')
            return false;
        }
        if (!validator.isEmail(emailAddress)){
            alert('emailAddress is not valid')
            return false;
        }
        return true;
    }

    nextPage = function(data){
        this.props.navigation.navigate('PersonalUser')
    }


    render() {
        return (
            <ScrollView >
            <View style={style.wrapper}>
                <Header />
                <View style={style.body}>
                    <View style={style.spacer}></View>
                    <View style={style.main}>
                        <View style={style.colFirst}>
                            <Text style={style.h1}>::basic info::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>first name:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(firstName) => 
                                this.updateInput({"firstName":firstName})}  value={this.props.basicUser.firstName}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>last name:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(lastName) => 
                                this.updateInput({"lastName":lastName})}  value={this.props.basicUser.lastName}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>email address:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(emailAddress) => 
                                this.updateInput({"emailAddress":emailAddress})}  value={this.props.basicUser.emailAddress}/>
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

function mapStateToProps(state, ownProps){
    return {
        basicAccount : state.basicAccount,
        basicUser : state.basicUser
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(basicUserAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicUser);

const style = StyleSheet.create({
    
    wrapper: {
        flex: 1,
        minHeight: 725
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
    colFirst: {
        marginTop: 10,
    },
    col: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        color: '#9fff80',
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    input: {
        flex: 1,
        color: '#9fff80',
        height: 40,

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