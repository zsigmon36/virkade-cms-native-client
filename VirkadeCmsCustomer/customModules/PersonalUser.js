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
import validator from 'validator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import personalUserAction from './reduxActions/PersonalUserAction'
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'
import { Picker } from '@react-native-community/picker';


class PersonalUser extends Component {

    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this);
    }

    state = {
        validatorMsg: ''
    }

    updateInput(data) {
        this.validateInput(false)
        this.props.actions(data)
    }

    clickNext() {
        let { } = this.props.personalUser;
        let { username, password } = this.props.basicAccount;
        let user = {
            username: username,
            password: password,
        }
        this.validateInput() && DatabaseAPI.updateUser(user, this.nextPage)
    }

    validateInput(isAlert = true) {
        let { firstName, lastName, emailAddress } = this.props.basicUser;
        let msg = '';
        let isValid = true;
        if (!firstName) {
            msg = 'firstName cannot be empty'
            isValid = false;
        } else if (!lastName) {
            msg = 'lastName cannot be empty'
            isValid = false;
        } else if (!validator.isEmail(emailAddress)) {
            msg = 'emailAddress is not a valid email'
            isValid = false;
        }
        this.setState({ validatorMsg: msg })

        if (isAlert && !isValid) {
            alert(msg)
        }
        return isValid;
    }

    nextPage = function (data) {
        if (data.updateUser) {
            this.props.navigation.navigate('FinalDetails')
        } else {
            alert('Hmmm... \n Looks like something went wrong.')
        }
    }

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
                        <View style={style.colFirst}>
                            <Text style={style.h3}>:all of the following are optional.  However, we appreciate any personal details as these answers are used 
                            to improve our services and offerings. We do not share the information with any 3rd party partners or organizations:</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>gender you identify:</Text>
                            <TextInput style={style.input} underlineColorAndroid="#9fff80" />
                            <Picker
                                selectedValue={this.props.basicUser.gender}
                                style={style.input}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.updateInput({ "firstName": itemValue })
                                }>
                                <Picker.Item label="Male" value="m" />
                                <Picker.Item label="Female" value="f" />
                            </Picker>
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
                        <View style={[style.col, style.center]}>
                            <Text style={[style.label, style.h2]}>::physical address::</Text>
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
        basicAccount: state.basicAccount,
        basicUser: state.basicUser,
        PersonalUser: state.personalUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(personalUserAction, dispatch)
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