import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native'
import Header from './Header.js'
import userAction from './reduxActions/UserAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        return (
            <View style={style.wrapper}>
                <Header />
                <View style={style.body}>
                    <View style={style.spacer}></View>
                    <View style={style.main}>
                        <View style={style.colRight}>
                            <Text style={style.label}>welcome: {this.props.user.username}</Text>
                        </View>
                        <View style={style.colRight}>
                            <Text style={style.label}>[ {this.props.user.lastName}, {this.props.user.firstName} ]</Text>
                        </View>

                        <View style={style.colFirst}>
                            <Text style={style.h1}>::choose one::</Text>
                        </View>

                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('EditAccount')}>
                                <View style={style.next}>
                                    <Text style={style.label}>edit account</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>

                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('ScheduleSession')}>
                                <View style={style.next}>
                                    <Text style={style.label}>schedule session</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>

                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Feedback')}>
                                <View style={style.next}>
                                    <Text style={style.label}>give feedback</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
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
    h2: {
        color: '#9fff80',
        fontSize: 22,
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
    colRight: {
        alignSelf:'flex-end',
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