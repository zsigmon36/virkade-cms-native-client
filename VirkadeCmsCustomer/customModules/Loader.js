import React from 'react';
import {Text, View, Modal, StyleSheet, ActivityIndicator} from 'react-native';

const Loader = props => {
  let loading = props.loading || false;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={style.modalBackground}>
        <View style={style.activityWrapper}>
          <View style={style.indicator}>
            <ActivityIndicator animating={loading} />
            <Text style={style.label}>loading...</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;

const style = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000090',
  },
  activityWrapper: {
    alignItems: 'center',
    height: 100,
    width: '90%',
    backgroundColor: '#001a00',
    borderWidth: 1,
    borderColor: '#9fff80',
  },
  indicator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    minWidth: 135,
    marginLeft: 10,
    fontSize: 28,
    justifyContent: 'flex-start',
    fontFamily: 'TerminusTTFWindows-4.46.0',
  },
});
