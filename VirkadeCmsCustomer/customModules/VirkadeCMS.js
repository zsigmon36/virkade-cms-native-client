import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Header from './Header.js'

class VirkadeCMS extends Component {
    render() {
      return (
          <View style={{  backgroundColor: '#001a00'}}>
            <Header/>
          </View >

      );
    }
  }
  
  
  export default VirkadeCMS;
  
  const style = {
  
    body: {
      fontFamily: 'Terminus',
      padding: 20,
      fontSize: 28,
      color: '#9fff80'
    },
    textField: {
      fontFamily: 'Terminus',
      color: '#9fff80',
      border: 'none',
      borderBottom: '2px solid #9fff80',
      fontSize: 24,
    },
    submitBtn: {
      fontFamily: 'Terminus',
      color: '#9fff80',
      border: '2px solid #9fff80',
      fontSize: 26,
      cursor: 'pointer',
      margin: 10,
    },
    textFieldLabel: {
      fontFamily: 'Terminus',
      color: '#9fff80',
      fontSize: 24,
    },
    footer: {
      minHeight: 100,
     
    },
    logo: {
      width: '100%',
      height: 'auto',
      maxWidth: 600,
    }
  }