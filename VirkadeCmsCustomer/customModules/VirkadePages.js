import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import BasicAccount from './BasicAccount.js'
import EditAccount from './EditAccount.js'
import Home from './Home.js'
import ForgotPassword from './ForgotPassword.js'
import BasicUser from './BasicUser.js'
import PersonalUser from './PersonalUser.js'
import FinalDetails from './FinalDetails.js'
import TermsConditions from './TermsConditions.js'
import LimitedLiable from './LimitedLiable.js'
import Splash from './Splash.js'
import Login from './Login.js'
import EditLogin from './EditLogin.js'
import Feedback from './Feedback.js'
import ScheduleSession from './ScheduleSession.js'

const Stack = createStackNavigator() 
const VirkadePages = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EditLogin" component={EditLogin} />
          <Stack.Screen name="EditAccount" component={EditAccount} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="BasicAccount" component={BasicAccount} />
          <Stack.Screen name="BasicUser" component={BasicUser} />
          <Stack.Screen name="PersonalUser" component={PersonalUser} />
          <Stack.Screen name="FinalDetails" component={FinalDetails} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="TermsConditions" component={TermsConditions} />
          <Stack.Screen name="LimitedLiable" component={LimitedLiable} />
          <Stack.Screen name="ScheduleSession" component={ScheduleSession} />  
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default VirkadePages;
