import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableNativeFeedback
} from 'react-native';
import Header from './Header.js'

class BasicAccount extends Component {

    constructor(props){
        super(props)
        this.state = {
            userName: '',
            password: '',
            securityQ: '',
            securityA: ''
        }
    }

    clickNext(){
        this.props.navigation.navigate('BasicUser')
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
                            <TextInput style={style.input} underlineColorAndroid="#9fff80"  onChangeText={(userName) => this.setState({"userName":userName})}  value={this.state.userName}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>password:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(password) => this.setState({"password":password})}  value={this.state.password}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>security q:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityQ) => this.setState({"securityQ":securityQ})}  value={this.state.securityQ}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>security a:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(securityA) => this.setState({"securityA":securityA})}  value={this.state.securityA}/>
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

export default BasicAccount;

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