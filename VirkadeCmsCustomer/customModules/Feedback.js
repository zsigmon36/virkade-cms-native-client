import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableNativeFeedback,
    ScrollView,
} from 'react-native';
import Header from './Header.js'
import UserDock from './UserDock.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './reduxActions/UserAction'
import { DatabaseAPI } from './dataAccess/DatabaseAPI.js'
import Loader from './Loader.js';

class Feedback extends Component {

    constructor(props) {
        super(props)
        this.addUserComment = this.addUserComment.bind(this);
        this.nextPage = this.nextPage.bind(this)

    }
    state = {
        commentContent: '',
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

    addUserComment() {
        this.loading(true)
        let user = this.props.user
        user.commentContent = this.state.commentContent;
        user.commentType = 'GNRL_CMNT'
        if (user.commentContent && user.commentContent != '') {
            DatabaseAPI.addUserComment(user, this.nextPage)
        } else {
            this.loading(false)
            Alert.alert('::error::', `\ncomment cannot be empty`)
        }
    }

    nextPage(data, error) {
        if (data && data.addComment) {
            Alert.alert('::info::', '\nthanks for your feedback \nwe review comments on a daily basis')
            this.props.navigation.navigate('Home')
        } else if (error) {
            Alert.alert('::error::', `\nhmmm... \nlooks like something went wrong. \n${error[0].message}`)
        } else {
            Alert.alert('::error::', `\nhmmm... \ncould not add the comment.`)
        }
        this.loading(false)
    }

    render() {
        return (
            <ScrollView style={style.wrapper}>
                <Loader loading={this.state.loading} />
                <UserDock navigator={this.props.navigation}  />
                <Header />
                <View style={style.body}>
                    <View style={style.spacer}></View>
                    <View style={style.main}>
                        <View style={style.colFirst}>
                            <Text style={style.h1}>::feedback::</Text>
                        </View>
                        <View>
                            <Text style={style.h2}>::please provide your comments below::</Text>
                        </View>
                        <View style={style.col}>
                            <TextInput multiline={true} style={[style.input, style.textArea]} underlineColorAndroid='transparent' onChangeText={(commentContent) =>
                                this.setState({ 'commentContent': commentContent })} />
                        </View>
                        <View style={style.col}>
                            <TouchableNativeFeedback onPress={() => this.addUserComment()}>
                                <View style={style.next}>
                                    <Text style={style.label}>submit feedback</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

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
        fontSize: 20,
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
    label: {
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
        fontSize: 18,
        fontFamily: 'TerminusTTFWindows-4.46.0'
    },
    textArea: {
        height: 200,
        borderColor: '#9fff80',
        borderWidth: 2,
        marginBottom: 10,
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