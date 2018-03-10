import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation'
import BasicAccount from './BasicAccount.js'
import BasicUser from './BasicUser.js'
import PersonalUser from './PersonalUser.js'
import FinalDetails from './FinalDetails.js'
import TermsConditions from './TermsConditions.js'
import LimitedLiable from './LimitedLiable.js'
import Splash from './Splash.js'
import Login from './Login.js'
import Header from './Header.js'

const VirkadePages = StackNavigator({
  Splash: {screen: Splash},
  Login: {screen: Login},
  BasicAccount: {screen: BasicAccount},
  BasicUser: {screen: BasicUser},
  PersonalUser: {screen: PersonalUser},
  FinalDetails: {screen: FinalDetails},
  TermsConditions: {screen: TermsConditions},
  LimitedLiable : {screen: LimitedLiable}
},
{
  initialRouteName: 'Splash',
  navigationOptions: {
    header: null
  }
}

)

export default VirkadePages;
