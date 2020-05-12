import React, { Component } from 'react';
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

class BasicUser extends Component {
    render() {
        return (
    
            <ScrollView keyboardDismissMode='on-drag'>
                <Header />
                <View style={style.body}>
                    <View style={style.spacer}></View>
                    <View style={style.main}>
                        <View style={style.colFirst}>
                            <Text style={style.h1}>::personal info::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>gender:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>age:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>height:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>weight:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>eye space:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={[style.col,style.center]}>
                            <Text style={[style.label, style.h2]}>::address::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>street:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>apt:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>unit:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>city:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>state:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>postal code:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                        </View>
                        <View style={style.col}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('FinalDetails')}>
                            <View style={style.next}>
                                <Text style={style.label}>next</Text>
                            </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View style={style.spacer}></View>
                </View>
            </ScrollView>
        );
    }
}

export default BasicUser;

const style = StyleSheet.create({
    wrapper: {
        flex: 1,   
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
        fontSize: 20,
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0'
    },
    center: {
        alignSelf: 'center',
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