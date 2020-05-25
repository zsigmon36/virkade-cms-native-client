import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    Alert
} from 'react-native';
import Header from './Header.js'
import {DatabaseAPI} from './dataAccess/DatabaseAPI.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './reduxActions/UserAction';

class Login extends Component {
    constructor(props){
        super(props)
        this.signInCallBack = this.signInCallBack.bind(this)
        this.populateStore = this.populateStore.bind(this)
    }

    updateInput(data) {
        this.props.actions(data)
    }

    signInCallBack(data){
        if (data && data.signIn) {
            let {username, token, createdDate} = data.signIn
            this.updateInput({'authToken' : {
                'token': token,
                'createdDate': createdDate,
                'username': username
            }})
            DatabaseAPI.getAllFieldsUserByUserName(username,  this.populateStore)
        } else {
            Alert.alert('::error::',`\nlogin failed, make sure you provided the correct credentials or select forgot password`)

        }
    }

    populateStore(data, error) {
        if (data && data.getUserByUsername) {
            let userDetails = data.getUserByUsername
            this.updateInput({'fullUser': userDetails})
            this.props.navigation.navigate('Home');
        } else {
            Alert.alert('::error::',`\nLooks like something went wrong :( \n${error[0].message}`)

        }
    }

    render() {
        return (
            <View style={style.wrapper}>
                <Header />
                <View style={style.body}>
                    <View style={style.spacer}></View>
                    <View style={style.main}>
                        <View style={style.colFirst}>
                            <Text style={style.h1}>::sign in::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>username:</Text>
                            <TextInput style={style.input}  underlineColorAndroid="#9fff80" 
                                onChangeText={(username) =>
                                    this.updateInput({ username: username })} value={this.props.user.username}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>password:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" secureTextEntry={true} 
                             onChangeText={(password) =>
                                this.updateInput({ password: password })} value={this.props.user.password} />
                        </View>
                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => 
                                    DatabaseAPI.signIn(this.props.user.username, this.props.user.password, this.signInCallBack)
                                    }>
                                <View style={style.next}>
                                    <Text style={style.label}>submit</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                                <View style={style.forgot}>
                                    <Text style={style.label}>forgot password?</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
        height: 40,

        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    forgot: {
        flex: 1,
        height: 40,
        marginTop: 10,
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