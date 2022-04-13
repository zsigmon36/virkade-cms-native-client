/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import VirkadeCMS from './customModules/VirkadeCMS';
import {Provider} from 'react-redux';
import configureStore from './customModules/seed/Store';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <VirkadeCMS />
      </Provider>
    );
  }
}
