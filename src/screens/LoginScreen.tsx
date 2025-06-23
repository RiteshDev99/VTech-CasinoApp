import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import SignInLoginHeadPart from '../components/SignInLoginHeadPart';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { loginUser } from '../store/features/auth/authThunk';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RootStackParamList } from '../navigations/MainStackNavigator';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(loginUser({ email: emailOrPhone, password }, navigation));
      ToastAndroid.show('LogIn Successfully!', ToastAndroid.SHORT);
    } catch (error:any) {
      Alert.alert("Login Failed", error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SignInLoginHeadPart name={'Login'}/>
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        <Text style={styles.label}>E-Mail Address / Phone Number</Text>
        <TextInput
          style={styles.input}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          placeholder="Enter email or phone"
          keyboardType="default"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={!showPassword}
            style={styles.inputPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(prev => !prev)}
          >
            <Icon
              name={showPassword ? "visibility-off" : "visibility"}
              size={RFValue(20)}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.loginWith}>Log In With</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialIconContainer}>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.socialIcon} source={require('../assests/googleLogo.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.socialIcon} source={require('../assests/appleLogo.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.socialIcon} source={require('../assests/facebookLogo.png')} />
          </TouchableOpacity>
        </View>

        <Text style={styles.signUpPrompt}>
          Don't Have An Account?
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signInLink}>  Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  body: {
    padding: wp('8%'),
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    marginTop: -hp('12%'),
  },
  welcomeText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#FF8800',
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: RFValue(16),
    marginBottom: hp('1%'),
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.1%'),
    marginBottom: hp('2%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPassword: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.1%'),
    marginBottom: hp('2%'),
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: wp('2.5%'),
    bottom: hp('2.5%'),
  },
  forgotPassword: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: RFValue(10),
    color: '#555',
  },
  loginButton: {
    backgroundColor: 'green',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    marginTop: hp('3%'),
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  orText: {
    textAlign: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('1.5%'),
    fontSize: RFValue(12),
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  loginWith: {
    marginHorizontal: wp('2.5%'),
    fontSize: RFValue(12),
    color: '#888',
  },
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('3%'),
    marginTop: hp('3%'),
  },
  button: {
    backgroundColor: "#E7E7E7",
    padding: wp('3%'),
    borderRadius: wp('2%'),
  },
  socialIcon: {
    width: wp('9%'),
    height: wp('9%'),
    resizeMode: 'contain',
  },
  signUpPrompt: {
    marginTop: hp('7%'),
    marginBottom: hp('3%'),
    textAlign: 'center',
    fontSize: RFValue(12),
    color: '#000',
  },
  signInLink: {
    color: "green",
    fontWeight: '600',
  },
});
