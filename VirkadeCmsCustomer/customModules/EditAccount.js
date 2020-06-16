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
import UserDock from './UserDock.js'
import validator from 'validator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './reduxActions/UserAction'
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'
import { Picker } from '@react-native-community/picker';
import { pickerData } from '../static/pickerData';
import Loader from './Loader.js';

class EditAccount extends Component {

    constructor(props) {
        super(props)
        this.statusMessage = this.statusMessage.bind(this);
        this.setPickerSates = this.setPickerSates.bind(this);
        this.addPhoneNumber = this.addPhoneNumber.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.statusMessage = this.statusMessage.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        DatabaseAPI.getAllStates(this.props.user, this.setPickerSates)
    }
    state = {
        validatorMsg: '',
        pickerStates: <Picker.Item key="1" label="Arkansas" value="AR" />,
        everVr: '[ ]',
        canContact: '[ ]',
        reService: '[ ]',
        user: Object.assign({}, this.props.user),
        loading: true,
    }

    componentDidMount() {
        this.setState({ loading: false })
    }
    loading(data) {
        let loading = data || false;
        this.setState({ loading: loading })
        return true
    }

    everVrCheckBox = () => {
        if (this.state.everVr == '[ ]') {
            this.updateInput({ everVr: true })
            this.setState({ everVr: '[X]' })
        } else {
            this.updateInput({ everVr: false })
            this.setState({ everVr: '[ ]' })
        }
    }
    contactCheckBox = () => {
        if (this.state.canContact == '[ ]') {
            this.updateInput({ canContact: true })
            this.setState({ canContact: '[X]' })
        } else {
            this.updateInput({ canContact: false })
            this.setState({ canContact: '[ ]' })
        }
    }
    reCheckBox = () => {
        if (this.state.reService == '[ ]') {
            this.updateInput({ reService: true })
            this.setState({ reService: '[X]' })
        } else {
            this.updateInput({ reService: false })
            this.setState({ reService: '[ ]' })
        }
    }

    updateInput(data) {
        let user = this.state.user
        let key = Object.keys(data)[0]
        user[key] = data[key]
        this.setState(user)
        this.validateInput(data, false)
    }

    setPickerSates(data) {
        let pickerItems = [];
        if (data.getAllStates) {
            (data.getAllStates).map(item => {
                pickerItems.push(<Picker.Item key={item.name} label={item.name} value={item.stateCode} />)
            })
        }
        this.setState({ 'pickerStates': pickerItems })
    }

    clickNext() {
        this.loading(true)
        let { username, authToken } = this.state.user;
        let isValid = this.validateInput(this.state.user)
        if (isValid && username != authToken.username) {
            DatabaseAPI.getUserByUserName(this.state.user.username, this.validateUsername);
        } else if (isValid) {
            this.validateUsername(null)
        } else {
            this.loading(false)
        }

    }

    validateUsername(data, error) {
        let user = this.state.user;
        if (data && data.getUserByUserName) {
            this.loading(false)
            Alert.alert('::error::', '\nusername already exists, looks like someone beat you to it :(')
        } else if (user.street || user.postalCode || user.state || user.city) {
            DatabaseAPI.addUserAddress(user, this.addPhoneNumber)
        } else {
            this.addPhoneNumber();
        }
    }

    addPhoneNumber() {
        let user = this.state.user
        if (user.phoneNumber) {
            this.validateInput(user) && DatabaseAPI.addUserPhone(user, this.updateUser)
        } else {
            this.updateUser();
        }
    }

    updateUser() {
        let user = this.state.user
        DatabaseAPI.updateUser(user, this.statusMessage)
    }

    statusMessage(data, error) {
        if (data && data.updateUser) {
            this.props.actions({ fullUser: this.state.user })
            Alert.alert("::info::", "update complete")
        } else {
            Alert.alert('::error::', `\nhmmm... \nlooks like something went wrong. \n${error[0].messages}`)
        }
        this.loading(false)
    }

    validateInput(data, isAlert = true) {
        let { postalCode, age, weight, phoneNumber, firstName, lastName, emailAddress } = data;
        let msg = '';
        let isValid = true;
        if (postalCode != undefined && postalCode != '' && !validator.isPostalCode(postalCode, "US")) {
            msg = 'postal code is not valid'
            isValid = false;
        } else if (age != undefined && age != '' && (!validator.isNumeric(String(age)) || age.length > 3)) {
            msg = 'age has to be a number and less than 999'
            isValid = false;
        } else if (weight != undefined && weight != '' && (!validator.isNumeric(String(weight)) || weight.length > 3)) {
            msg = 'weight has to be a number and less than 999'
            isValid = false;
        } else if (phoneNumber != undefined && phoneNumber != '' && !validator.isMobilePhone(phoneNumber, 'any')) {
            msg = 'mobile phone number is invalid'
            isValid = false;
        } else if (firstName != undefined && firstName == "") {
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

    render() {
        return (
            <ScrollView keyboardDismissMode='on-drag' style={style.wrapper}>
                <Loader loading={this.state.loading} />
                <UserDock navigator={this.props.navigation} />
                <Header />
                <View style={style.body}>
                    <View style={style.spacer}></View>
                    <View style={style.main}>
                        <View style={style.center}>
                            <Text style={style.label}>{this.state.validatorMsg}</Text>
                        </View>
                        <View style={style.colFirst}>
                            <Text style={style.h1}>::account details::</Text>
                        </View>
                        <View style={style.colFirst}>
                            <Text style={style.h2}>::personal info::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>first name:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(firstName) =>
                                this.updateInput({ "firstName": firstName })} value={this.state.user.firstName} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>last name:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(lastName) =>
                                this.updateInput({ "lastName": lastName })} value={this.state.user.lastName} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>email address:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(emailAddress) =>
                                this.updateInput({ "emailAddress": emailAddress.trim() })} value={this.state.user.emailAddress} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>gender you identify:</Text>
                            <Picker
                                selectedValue={this.state.user.gender}
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
                                this.updateInput({ 'age': age.trim() })} value={String(this.state.user.age)} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>height:</Text>
                            <Picker
                                selectedValue={this.state.user.heightFt}
                                style={style.input}
                                itemStyle={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "heightFt": itemValue })
                                }>
                                <Picker.Item label="sel foot" value="0" />
                                {
                                    (pickerData.heightFt).map((item) => {
                                        return <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    })
                                }
                            </Picker>
                            <Picker
                                selectedValue={this.state.user.heightIn}
                                style={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "heightIn": itemValue })
                                }>
                                <Picker.Item label="sel inch" value="0" />
                                {
                                    (pickerData.heightIn).map((item) => {
                                        return <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>weight:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(weight) =>
                                this.updateInput({ 'weight': weight.trim() })} value={String(this.state.user.weight)} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>eye space:</Text>
                            <Picker
                                selectedValue={String(this.state.user.idp)}
                                style={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "idp": itemValue })
                                }>
                                <Picker.Item label="select" value="0.0" />
                                {
                                    (pickerData.idp).map((item) => {
                                        return <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={[style.col, style.center]}>
                            <Text style={style.label}>{this.state.validatorMsg}</Text>
                        </View>
                        <View style={[style.col, style.center]}>
                            <Text style={[style.label, style.h2]}>::physical address::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>street:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(street) =>
                                this.updateInput({ 'street': street })} value={this.state.user.street} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>apt:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(apt) =>
                                this.updateInput({ 'apt': apt })} value={this.state.user.apt} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>unit:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(unit) =>
                                this.updateInput({ 'unit': unit })} value={this.state.user.unit} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>city:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(city) =>
                                this.updateInput({ 'city': city })} value={this.state.user.city} />
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>state:</Text>
                            <Picker
                                selectedValue={this.state.user.state}
                                style={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "state": itemValue })
                                }>
                                <Picker.Item label="select" value="" />
                                {this.state.pickerStates}
                            </Picker>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>postal code:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(postalCode) =>
                                this.updateInput({ 'postalCode': postalCode })} value={this.state.user.postalCode} />
                        </View>
                        <View style={[style.col, style.center]}>
                            <Text style={style.label}>{this.state.validatorMsg}</Text>
                        </View>
                        <View style={style.colFirst}>
                            <Text style={style.h2}>::mobile phone number::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>cc:</Text>
                            <Picker
                                selectedValue={this.state.user.phoneCountryCode}
                                style={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "phoneCountryCode": itemValue })
                                }>
                                <Picker.Item label="select" value='0' />
                                {
                                    (pickerData.phoneCountries).map((item) => {
                                        return <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    })
                                }
                            </Picker>
                            <Text style={style.label}>number:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" onChangeText={(phoneNumber) =>
                                this.updateInput({ 'phoneNumber': phoneNumber })} value={this.state.user.phoneNumber} />
                        </View>
                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.clickNext()}>
                                <View style={style.next}>
                                    <Text style={style.label}>update</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Home')}>
                                <View style={style.next}>
                                    <Text style={style.label}>home</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#001a00',
    },
    body: {
        flexDirection: 'row',
        flex: 0.75,
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
    checkBox: {
        color: '#9fff80',
        fontSize: 14,
        fontFamily: 'TerminusTTFWindows-4.46.0'
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
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#9fff80',
        borderWidth: 2,
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})