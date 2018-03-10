import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    ScrollView,
    Alert
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import Header from './Header.js'

class FinalDetails extends Component {
    state = {
        everVr: '[ ]',
        contactYou: '[ ]',
        reService: '[ ]'
    }

    everVrCheckBox = () => {
        if (this.state.everVr == '[ ]') {
            this.setState({ everVr: '[X]' })
        } else {
            this.setState({ everVr: '[ ]' })
        }
    }
    contactCheckBox = () => {
        if (this.state.contactYou == '[ ]') {
            this.setState({ contactYou: '[X]' })
        } else {
            this.setState({ contactYou: '[ ]' })
        }
    }
    reCheckBox = () => {
        if (this.state.reService == '[ ]') {
            this.setState({ reService: '[X]' })
        } else {
            this.setState({ reService: '[ ]' })
        }
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
                                <Text style={style.h1}>::final info::</Text>
                            </View>
                            <View style={style.col}>
                                <Text style={style.checkBox} onPress={this.everVrCheckBox}> {this.state.everVr} ever experienced VR?</Text>
                            </View>

                            <View style={style.col}>
                                <Text style={style.checkBox} onPress={this.contactCheckBox}> {this.state.contactYou} can we contact you?</Text>
                            </View>
                            <View style={style.col}>
                                <Text style={style.checkBox} onPress={this.reCheckBox}> {this.state.reService} interested in VR Real Estate services?</Text>
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>:note any conditions we should be aware of:</Text>
                            </View>
                            <View style={style.col}>
                                <TextInput multiline={true} style={[style.input, style.textArea]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={style.col}>
                                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('TermsConditions')}>
                                    <View style={style.next}>
                                        <Text style={style.label}>legal stuff</Text>
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

export default FinalDetails;

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
    checkBox: {
        color: '#9fff80',
        fontSize: 14,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    input: {
        flex: 1,
        color: '#9fff80',
        height: 40,

        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    textArea: {
        height: 100,
        borderColor: '#9fff80',
        borderWidth: 2,
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