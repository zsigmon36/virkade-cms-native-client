import React, {Component} from 'react';
import logo from '../static/logo.png';
import {Image, StyleSheet, View} from 'react-native';
class Header extends Component {
  render() {
    return (
      <View style={style.header}>
        <View style={style.spacer} />
        <Image style={style.logo} source={logo} resizeMode="contain" />
        <View style={style.spacer} />
      </View>
    );
  }
}

export default Header;

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flex: 0.25,
    minHeight: 200,
    backgroundColor: '#001a00',
  },
  logo: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  spacer: {
    flex: 0.1,
  },
});
