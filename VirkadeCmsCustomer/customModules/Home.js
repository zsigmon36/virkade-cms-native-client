import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native'
import Header from './Header.js'
import UserDock from './UserDock.js'
import userAction from './reduxActions/UserAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        return (
            <View style={style.wrapper}>
                 <UserDock props={this.props.navigation}/>
                <Header/>
               
                <View style={style.col}>
                    <View style={style.rowFirst}>
                        <Text style={style.h1}>::choose one::</Text>
                    </View>

                    <View style={style.row}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('EditLogin')}>
                            <View style={style.next}>
                                <Text style={style.label}>change login info</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>


                    <View style={style.row}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('EditAccount')}>
                            <View style={style.next}>
                                <Text style={style.label}>edit account</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={style.row}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('ScheduleSession')}>
                            <View style={style.next}>
                                <Text style={style.label}>schedule session</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={style.row}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Feedback')}>
                            <View style={style.next}>
                                <Text style={style.label}>give feedback</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={style.spacer}></View>
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
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#001a00',

        
    },
    col: {
        flexDirection: 'column',
        backgroundColor: '#001a00',
        flex:1,
    },
    h1: {
        color: '#9fff80',
        fontSize: 26,
        alignSelf: 'center',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0',
    },
    h2: {
        color: '#9fff80',
        fontSize: 22,
        alignSelf: 'center',
        fontFamily: 'TerminusTTFWindows-Bold-4.46.0'
    },
    rowFirst: {
        marginTop: 10,
    },
    row: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: '#9fff80',
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    spacer: {
        flex: 0.1,
        backgroundColor: '#001a00',
    },
    next: {
        marginTop: 20,
        borderColor: '#9fff80',
        borderWidth: 2,
        flex: 0.95,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})