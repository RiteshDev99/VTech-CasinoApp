import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ProfileScreenUpperside from '../components/ProfileScreenUpperside';
import ProfileScreenDownrside from '../components/ProfileScreenDownrside';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/MainStackNavigator';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { user } = useSelector((state:any) => state.auth);

  return (
    <SafeAreaView style={styles.MainContainer}>
      {user ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + hp('12%') }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileScreenUpperside />
          <ProfileScreenDownrside />
        </ScrollView>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.promptText}>You are not logged in.</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
  },
  promptText: {
    fontSize: RFValue(16),
    fontWeight: '500',
    color: '#444',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  loginBtn: {
    marginTop: hp('2%'),
    backgroundColor: '#FF8800',
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('1.8%'),
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
});
