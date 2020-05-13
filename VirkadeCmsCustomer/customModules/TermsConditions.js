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
import Markdown from 'react-native-markdown-renderer';
import { tandc } from '../static/tandc'

class TermsConditions extends Component {
    state = {
        agree: '[ ]',
    } 

    agreeCheckBox = () => {
        if (this.state.agree == '[ ]') {
            this.setState({ agree: '[X]' })
        } else {
            this.setState({ agree: '[ ]' })
        }
    }
    render() {
        let termsAndConds = tandc.enUS;
        console.log(tandc)
        return (
            <ScrollView >
                <View style={style.wrapper}>
                    <Header />
                    <View style={style.body}>
                        <View style={style.spacer}></View>
                        <View style={style.main}>
                            <View style={style.colFirst}>
                                <Text style={style.h1}>::terms & conditions::</Text>
                            </View>
                            <View style={[style.col, style.border, style.padit]}>
                                <Markdown style={mdStyle}>{termsAndConds}</Markdown>
                            </View>
                            <View style={[style.col, style.edgeSpace]}>
                                <Text style={style.checkBox} onPress={this.agreeCheckBox}> {this.state.agree} do you agree to the terms and conditions?</Text>
                            </View>
                            <View style={[style.col, style.edgeSpace]}>
                                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('LimitedLiable')}>
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

export default TermsConditions;

const mdStyle = StyleSheet.create({
    text: {
        color: '#9fff80',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0',
    },
    listOrderedItemIcon: {
        color: '#9fff80',
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 34,
    },
    listUnorderedItemIcon: {
        color: '#9fff80',
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 34,
    },
  });


const style = StyleSheet.create({

    wrapper: {
        flex: 0,
        minHeight: 850
    },
    body: {
        flexDirection: 'row',
        flex: 0,
        backgroundColor: '#001a00',
    },
    main: {
        flexDirection: 'column',
        flex: 0
    },
    h1: {
        color: '#9fff80',
        fontSize: 21,
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
    edgeSpace: {
        marginLeft: 20,
        marginRight: 20
    },
    label: {
        color: '#9fff80',
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    checkBox: {
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
    textArea: {
        height: 100,
        borderColor: '#9fff80',
        borderWidth: 2,
    },
    spacer: {
        flex: 0.1,
    },
    padit: {
        padding: 10,
    },
    border: {
        borderWidth: 2,
        borderColor: '#9fff80',
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