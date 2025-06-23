import React, { useState } from 'react';
import { Modal, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SpinPageBackSide from '../components/SpinPageBackSide';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FortuneWheel from './spinwheele';

const SpinScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <FortuneWheel />
    </SafeAreaView>
  );
};

export default SpinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});