import React, { Component } from 'react';
import logo from '../static/logo.png';
import 
  {Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
class Header extends Component {
    render() {
      return (
          <View style={style.header}>
              <Image style={style.logo} source={logo} />
          </View>
      );
    }
  }
  
  
  export default Header;
  
  const style = StyleSheet.create({
    logo: {
      width: '100%',
      height: '50%',
      maxWidth: 600,
    },
    header: {
      width: '100%',
      height: 600,
    }
  })