import React, { Component } from 'react';
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
import validator from 'validator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './reduxActions/UserAction'
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'
import { Picker } from '@react-native-community/picker';
import { pickerData } from '../static/pickerData';


class PersonalUser extends Component {

    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this);
        this.setPickerSates = this.setPickerSates.bind(this);
        DatabaseAPI.getAllStates(this.props.user, this.setPickerSates)
    }

    state = {
        validatorMsg: '',
        pickerStates: <Picker.Item key="1" label="Arkansas" value="AR" />
    }

    updateInput(data) {
        this.props.actions(data)
        this.validateInput(data, false)
    }

    setPickerSates(data){
        let pickerItems = [];
        if (data.getAllStates){
            (data.getAllStates).map(item => {
                pickerItems.push(<Picker.Item key={item.stateCode} label={item.name} value={item.stateCode} />)
            })
        }
        this.setState({'pickerStates': pickerItems})
    }

    clickNext() {
        let user = this.props.user
        this.validateInput(user) && DatabaseAPI.updateUser(user, this.nextPage)
    }

    validateInput(data, isAlert = true) {
        let {postalCode} = data;
        let msg = '';
        let isValid = true;
        //let matches = zip.match(/^[0-9]{5}(?:-[0-9]{4})?$/g);
        if (postalCode != undefined && !validator.isPostalCode(postalCode,"US")) {
            msg = 'postal code is not valid'
            isValid = false;
        }
        this.setState({ validatorMsg: msg })

        if (isAlert && !isValid) {
            Alert.alert('::error::', msg)
        }
        return isValid;
    }

    nextPage(data) {
        if (data && data.updateUser) {
            this.props.navigation.navigate('FinalDetails')
        } else {
            Alert.alert('::error::','\nhmmm... \nlooks like something went wrong.')
        }
    }

    render() {
        let user = this.props.user
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
                            <Text style={style.h3}>:all of the following are optional.  However, we appreciate any personal details as these answers are used 
                            to improve our services and offerings. We do not share the information with any 3rd party partners or organizations:</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>gender you identify:</Text>
                            <Picker
                                selectedValue={user.gender}
                                style={style.picker}
                                itemStyle={style.pickerItem}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "gender": itemValue })
                                }>
                                <Picker.Item label="select" value="" />
                                <Picker.Item label="male" value="m" />
                                <Picker.Item label="female" value="f" />
                            </Picker>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>age:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(age) =>
                                    this.updateInput({ 'age': age })} value={user.age} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>height:</Text>
                            <Picker
                                selectedValue={user.heightFt}
                                style={style.input}
                                itemStyle={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "heightFt": itemValue })
                                }>        
                                <Picker.Item label="sel foot" value="" />
                                {
                                    (pickerData.heightFt).map( (item) => {
                                       return <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    })
                                }
                            </Picker>
                            <Picker
                                selectedValue={user.heightIn}
                                style={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "heightIn": itemValue })
                                }>
                                <Picker.Item label="sel inch" value="" />
                                {
                                     (pickerData.heightIn).map( (item) => {
                                        return <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>weight:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(weight) =>
                                    this.updateInput({ 'weight': weight })} value={user.weight}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>eye space:</Text>
                            <Picker
                                selectedValue={user.idp}
                                style={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "idp": itemValue })
                                }>
                                <Picker.Item label="select" value="" />
                                {
                                     (pickerData.idp).map( (item) => {
                                        return <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={[style.col, style.center]}>
                            <Text style={[style.label, style.h2]}>::physical address::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>street:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(street) =>
                                    this.updateInput({ 'street': street })} value={user.street}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>apt:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(apt) =>
                                    this.updateInput({ 'apt': apt })} value={user.apt}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>unit:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(unit) =>
                                    this.updateInput({ 'unit': unit })} value={user.unit}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>city:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(city) =>
                                    this.updateInput({ 'city': city })} value={user.city}/>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>state:</Text>
                            <Picker
                                selectedValue={user.state}
                                style={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "state": itemValue })
                                }>
                                <Picker.Item label="select" value="" />
                                {this.state.pickerStates}
                            </Picker>
                        </View>
                        { this.state.validatorMsg !== '' && (
                            <View style={style.center}>
                                    <Text style={style.label}>{this.state.validatorMsg}</Text>
                            </View>
                            )
                        }
                        <View style={style.col}>
                            <Text style={style.label}>postal code:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(postalCode) =>
                                    this.updateInput({ 'postalCode': postalCode })} value={user.postalCode}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalUser);

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
        fontSize: 22,
        color: '#9fff80',
        alignSelf: 'center',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0'
    },
    h3: {
        fontSize: 18,
        color: '#9fff80',
        alignSelf: 'center',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0'
    },
    center: {
        alignSelf: 'center',
        alignItems: 'center'
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
    picker: {
        fontFamily: 'TerminusTTFWindows-4.46.0',
        flex: 1,
        textDecorationLine: 'underline',
        color: '#9fff80',
    },
    pickerItem: {
        fontFamily: 'TerminusTTFWindows-4.46.0',
        flex: 1,
        textDecorationLine: 'underline',
        color: '#9fff80',
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