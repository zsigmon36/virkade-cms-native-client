import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native'
import Header from './Header.js'
import UserDock from './UserDock.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './reduxActions/UserAction'
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'
import { Picker } from '@react-native-community/picker';
import Loader from './Loader.js';

class ScheduleSession extends Component {

    constructor(props) {
        super(props)
        this.setSessionOptions = this.setSessionOptions.bind(this)
        DatabaseAPI.getAvailableSession(this.props.user, this.setSessionOptions)
    }

    state = {
        availableSessions: <Picker.Item key="1" label="select" value="" />,
        sessionTime: "",
        loading: true,
        mySessions: {},
    }

    componentDidMount() {
        this.setState({ loading: false })
    }
    loading(data) {
        let loading = data || false;
        this.setState({ loading: loading })
        return true
    }

    setSessionOptions(data) {
        let pickerItems = [];
        if (data.getAvailableSession) {
            (data.getAvailableSession).map(item => {
                pickerItems.push(<Picker.Item key={item.key} label={`${item.startTime} - ${item.endTime}`} value={item.startTime} />)
            })
        }
        this.setState({ 'availableSessions': pickerItems })
    }

    scheduleSession() {
        Alert.alert("::info::", "method not implemented yet")
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
                        <View style={style.colFirst}>
                            <Text style={style.h1}>::schedule session::</Text>
                        </View>
                        <View style={style.col}>
                            <Text style={style.label}>pick one:</Text>
                            <Picker
                                selectedValue={this.state.sessionTime}
                                style={style.input}
                                onValueChange={(itemValue) =>
                                    this.updateInput({ "sessionTime": itemValue })
                                }>
                                <Picker.Item label="select" value="" />
                                {this.state.availableSessions}
                            </Picker>
                        </View>
                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.scheduleSession()}>
                                <View style={style.next}>
                                    <Text style={style.label}>schedule</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSession);

const style = StyleSheet.create({
    wrapper: {
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