import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableNativeFeedback
} from 'react-native'
import userAction from './reduxActions/UserAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'

class UserDock extends Component {

    constructor(props) {
        super(props)
        this.gotoSplash = this.gotoSplash.bind(this);
    }

    logout(){
        DatabaseAPI.signOut(this.props.user.authToken, this.gotoSplash)
    }

    gotoSplash(data, error){
        if (data && data.signOut){
            this.props.navigate('Splash')
        }else{
            Alert.alert('::error::',`\nhmmm... \nlooks like something went wrong.  \n${error[0].message}`)
        }
    }
    render() {
        return (
                <View style={style.body}>
                    <View style={style.row}>
                        <View style={style.col}>
                            <Text style={style.label}>welcome: {this.props.user.username}</Text>
                            <Text style={style.label}>{this.props.user.lastName}, {this.props.user.firstName}</Text>
                        </View>
                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.logout()}>
                                <View style={style.next}>
                                    <Text style={style.label}>logout</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        navigate: ownProps.props.navigate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDock);
const style = StyleSheet.create({
    body: {
        marginTop: 10,
        backgroundColor: '#001a00',
        display: 'flex',
        flexDirection: "row",
        justifyContent:'center',
        marginBottom: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexGrow: 0.90,
    },
    col: {
        flexGrow: 1,
        alignItems: "stretch",
    },
    label: {
        color: '#9fff80',
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    next: {
        borderColor: '#9fff80',
        borderWidth: 2,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
})