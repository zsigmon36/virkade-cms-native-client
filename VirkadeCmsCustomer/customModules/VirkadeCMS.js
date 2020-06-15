import React, { Component } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import VirkadePages from './VirkadePages.js'
class VirkadeCMS extends Component {
  render() {
    return (
      <View style={style.topContainer}>
        <StatusBar hidden={true} />
        <VirkadePages />
      </View>
    );
  }
}

export default VirkadeCMS;

const style = {
  topContainer: {
    flex: 1,
    fontFamily: 'TerminusTTFWindows-4.46.0'
  }
}