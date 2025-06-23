import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react'; // <-- Added useEffect
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { signInUser } from '../store/features/auth/authThunk';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SignInLoginHeadPart from '../components/SignInLoginHeadPart';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const SignInScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [referral, setReferral] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    // const { error } = useSelector((state: RootState) => state.auth);

    const navigation = useNavigation<NavigationProp<any>>();

    const handleSignin = async () => {
        if (!name || !email || !password || !mobile) {
            return Alert.alert('Error', 'Please enter all credentials');
        }

        setLoading(true);
        try {
            await dispatch(signInUser({ name, username, email, password, mobile, code: referral, })).unwrap();

            navigation.navigate('Login');
            Alert.alert('SignUp Successful');
        } catch (err: any) {
            Alert.alert('Sign Up Failed', err.message || 'Sign Up failed');
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp('10%') }}>
                <SignInLoginHeadPart name={'Sign Up'} />

                <View style={styles.body}>
                    <Text style={styles.welcomeText}>Welcome!</Text>
                    <Text style={styles.label}>User Name</Text>
                    <TextInput
                        placeholder="username"
                        placeholderTextColor="#888"
                        onChangeText={setUsername}
                        value={username}
                        style={styles.input}
                        autoCapitalize="words"
                    />

                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor="#888"
                        onChangeText={setName}
                        value={name}
                        style={styles.input}
                        autoCapitalize="words"
                    />

                    <Text style={styles.label}>E-Mail Address</Text>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#888"
                        onChangeText={setEmail}
                        value={email}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Mobile</Text>
                    <TextInput
                        placeholder="Mobile"
                        placeholderTextColor="#888"
                        onChangeText={setMobile}
                        value={mobile}
                        style={styles.input}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.label}>Referral Code</Text>
                    <TextInput
                        placeholder="Referral Code (optional)"
                        placeholderTextColor="#888"
                        onChangeText={setReferral}
                        value={referral}
                        style={styles.input}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            style={styles.inputPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword((prev) => !prev)}
                            style={styles.eyeIcon}
                            activeOpacity={0.7}
                        >
                            <Icon
                                name={showPassword ? 'visibility-off' : 'visibility'}
                                size={RFValue(18)}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleSignin} style={styles.loginButton} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Sign Up</Text>
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
                            <Image
                                style={styles.socialIcon}
                                source={require('../assests/googleLogo.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                style={styles.socialIcon}
                                source={require('../assests/appleLogo.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                style={styles.socialIcon}
                                source={require('../assests/facebookLogo.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.signUpPrompt}>
                        Already Have an Account?
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signInLink}> Log In</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        paddingHorizontal: wp('7%'),
        paddingVertical: hp('3%'),
        backgroundColor: '#fff',
        borderTopLeftRadius: hp('3%'),
        borderTopRightRadius: hp('3%'),
        marginTop: -hp('12%'),
        minHeight: hp('80%'),
    },
    welcomeText: {
        fontSize: RFValue(22),
        fontWeight: 'bold',
        color: '#FF8800',
        marginBottom: hp('1.5%'),
    },
    label: {
        fontSize: RFValue(14),
        marginTop: hp('1%'),
        marginBottom: hp('0.5%'),
        marginLeft: hp('0.8%'),
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: hp('0.8%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.1%'),
        marginBottom: hp('1%'),
        fontSize: RFValue(14),
        color: '#000',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    inputPassword: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: hp('0.8%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.1%'),
        fontSize: RFValue(14),
        color: '#000',
    },
    eyeIcon: {
        position: 'absolute',
        right: wp('3%'),
        padding: 5,
    },
    loginButton: {
        backgroundColor: 'green',
        paddingVertical: hp('1.5%'),
        borderRadius: hp('0.8%'),
        marginTop: hp('3.5%'),
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: RFValue(16),
        fontWeight: '400',
    },
    orText: {
        textAlign: 'center',
        marginTop: hp('3%'),
        marginBottom: hp('1.5%'),
        fontSize: RFValue(13),
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
        marginHorizontal: wp('3%'),
        fontSize: RFValue(13),
        color: '#888',
    },
    socialIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
    },
    button: {
        backgroundColor: '#E7E7E7',
        padding: wp('3%'),
        borderRadius: hp('1.2%'),
    },
    socialIcon: {
        width: wp('9%'),
        height: wp('9%'),
        resizeMode: 'contain',
    },
    signUpPrompt: {
        marginTop: hp('7%'),
        marginBottom: hp('2.5%'),
        textAlign: 'center',
        fontSize: RFValue(13),
        color: '#000',
    },
    signInLink: {
        color: 'green',
        fontWeight: '600',
    },
});
