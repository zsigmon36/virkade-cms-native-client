import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableNativeFeedback
} from 'react-native';
import Header from './Header.js'
import { bindActionCreators } from 'redux';
import basicAccountAction from './reduxActions/BasicAccountAction'
class BasicAccount extends Component {

    constructor(props){
        super(props)
    }
    updateInput(data){
        this.props.actions(data)
    }

    clickNext(){
        this.validateInput() && this.props.navigation.navigate('BasicUser')
    }

    validateInput(){
        let {username, password, securityQ, securityA} = this.props.basicAccount;
        if (!username || username.length < 6){
            alert('username is too short')
            return false;
        }
        if (!password || password.length < 8){
            alert('password is too short')
            return false;
        }
        if (!securityQ){
            alert('securityQ cannot be empty')
            return false;
        }
        if (!securityA){
            alert('securityA cannot be empty')
            return false;
        }
        return true;
    }

    render() {
        return (
            <View style={style.wrapper}>
                <Header />
                <View style={style.body}>
                    <View style={style.spacer}></View>
                    <View style={style.main}>
                        <View style={style.colFirst}>
                            <Text style={style.h1}>::create account::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>username:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80"  onChangeText={(username) => 
                                this.updateInput({username:username})}  value={this.props.basicAccount.username}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>password:</Text>
                            <TextInput style={style.input} secureTextEntry={true} underlineColorAndroid="#9fff80" onChangeText={(password) => 
                                this.updateInput({password:password})}  value={this.props.basicAccount.password}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>security q:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityQ) => 
                                this.updateInput({securityQ:securityQ})}  value={this.props.basicAccount.securityQ}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>security a:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityA) => 
                                this.updateInput({securityA:securityA})}  value={this.props.basicAccount.securityA}/>
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
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        basicAccount: state.basicAccount
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(basicAccountAction, dispatch)
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