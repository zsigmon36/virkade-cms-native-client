import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    TouchableNativeFeedback
} from 'react-native' 
import Header from './Header.js'

class Splash extends Component {
    
    render() {
        return (
            <View style={style.wrapper}>
            <Header/>
            <View style={style.body}>
                <View style={style.spacer}></View>
                <View style={style.main}>

                    <View style={style.colFirst}>
                        <Text style={style.h1}>::choose one::</Text>
                    </View>

                    <View style={style.col}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Login')}>
                            <View style={style.next}>
                                <Text style={style.label}>login</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={style.col}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('BasicAccount')}>
                            <View style={style.next}>
                                <Text style={style.label}>register</Text>
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

export default Splash;
const style = StyleSheet.create({
    wrapper:{
        display: 'flex',
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
    spacer: {
        flex: 0.1,
    },
    next: {
        marginTop: 20,
        borderColor: '#9fff80',
        borderWidth: 2,
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})