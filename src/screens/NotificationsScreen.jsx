import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const NotificationsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={RFValue(24)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* Body */}
      <View style={styles.content}>
        <Icon name="notifications-off-outline" size={RFValue(80)} color="#ccc" />
        <Text style={styles.title}>No Notifications</Text>
        <Text style={styles.subtitle}>
          You're all caught up! We'll let you know when something happens.
        </Text>
      </View>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:20,
    backgroundColor: '#34A853',
    paddingHorizontal: wp(5),
    paddingTop: hp(7),
    paddingBottom: hp(2.5),
  },
  backButton: {
    paddingRight: wp(2),
  },
  headerText: {
    fontSize: RFValue(24),
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: '500',
    color: '#444',
    marginTop: hp(2.5),
  },
  subtitle: {
    fontSize: RFValue(14),
    color: '#777',
    textAlign: 'center',
    marginTop: hp(1.5),
    paddingHorizontal: wp(5),
  },
});
