import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    ScrollView,
} from 'react-native';
import Header from './Header.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './reduxActions/UserAction'

class FinalDetails extends Component {
    
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this);
    }
    
    state = {
        everVr: '[ ]',
        canContact: '[ ]',
        reService: '[ ]',
    }

    updateInput(data) {
        this.props.actions(data)
    }

    everVrCheckBox = () => {
        if (this.state.everVr == '[ ]') {
            this.updateInput({everVr:true})
            this.setState({ everVr: '[X]' })
        } else {
            this.updateInput({everVr:false})
            this.setState({ everVr: '[ ]' })
        }
    }
    contactCheckBox = () => {
        if (this.state.canContact == '[ ]') {
            this.updateInput({canContact:true})
            this.setState({ canContact: '[X]' })
        } else {
            this.updateInput({canContact:false})
            this.setState({ canContact: '[ ]' })
        }
    }
    reCheckBox = () => {
        if (this.state.reService == '[ ]') {
            this.updateInput({reService:true})
            this.setState({ reService: '[X]' })
        } else {
            this.updateInput({reService:false})
            this.setState({ reService: '[ ]' })
        }
    }

    //at somepoint we should be able to add numbers
    getContactInfo() {
        let contactDetails = [];
        contactDetails.push(
                <View style={style.col}>
                    <Text style={style.label} >::email address::</Text>
                </View>
        )
        contactDetails.push(
                <View style={style.col}>
                    <Text style={style.label} >{this.props.user.emailAddress}</Text>
                </View>
        )
        contactDetails.push(
                <View style={style.col}>
                    <Text style={style.label} >::phone numbers::</Text>
                </View>
          
        )
        for (number in this.props.user.phoneNumbers) {
            contactDetails.push(
                <View style={style.col}>
                    <Text style={style.label} >{`${number.type} : ${number.countryCode} - ${number.number}`}</Text>
                </View>
            )
        }
        this.setState({'contactDetails':contactDetails});
    }

    clickNext() {
        let user = this.props.user
        DatabaseAPI.updateUser(user, this.nextPage)
    }

    nextPage(data) {
        if (data && data.updateUser) {
            this.props.navigation.navigate('TermsConditions')
        } else {
            Alert.alert('::error::','\nhmmm... \nlooks like something went wrong.')
        }
    }

    render() {
       this.getContactInfo()
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
                                <Text style={style.checkBox} onPress={this.contactCheckBox}> {this.state.canContact} can we contact you? </Text>
                                {
                                this.state.canContact === '[X]' && this.state.contactDetails
                                }
                            </View>  
                            <View style={style.col}>
                                <Text style={style.checkBox} onPress={this.reCheckBox}> {this.state.reService} interested in VR real estate services?</Text>
                            </View>
                            <View style={style.col}>
                                <Text style={style.label}>:note any conditions we should be aware of:</Text>
                            </View>
                            <View style={style.col}>
                                <TextInput multiline={true} style={[style.input, style.textArea]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={style.col}>
                                <TouchableNativeFeedback onPress={() => 
                                     this.clickNext()     
                                  }>
                                        
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

export default connect(mapStateToProps, mapDispatchToProps)(FinalDetails);

const style = StyleSheet.create({

    wrapper: {
        flex: 1,
        minHeight: 900
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
        alignItems: 'center'
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