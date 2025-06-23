import {
    Alert,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../store/features/auth/authThunk';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppDispatch } from '../store/store';
import Clipboard from '@react-native-clipboard/clipboard';
import { fetchReferralCode } from '../store/features/refferal/refferalThunk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/MainStackNavigator';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


const PersonalDetails = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch<AppDispatch>();
    const { basicUser, userDetails, token } = useSelector((state:any)=> state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if (basicUser?._id && !userDetails) {
            dispatch(getUserDetails(basicUser._id));
        } else if (userDetails) {
            setName(userDetails.name || '');
            setEmail(userDetails.email || '');
            setMobile(userDetails.mobile || '');
            setGender(userDetails.gender || '');
            setDob(userDetails.dob ? new Date(userDetails.dob) : new Date());
        }

        dispatch(fetchReferralCode())
            .unwrap()
            .then((data) => {
                setReferralCode(data.code);
            })
            .catch((error) => {
                console.error('❌ Error fetching referral code:', error);
            });
    }, [basicUser, userDetails]);

    if (!userDetails) {
        return (
            <SafeAreaView style={styles.MainContainer}>
                <Text style={{ textAlign: 'center', marginTop: hp('5%') }}>Loading user details...</Text>
            </SafeAreaView>
        );
    }

    const onChangeDate = ({event, selectedDate}:any) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDob(selectedDate);
        }
    };


  
   
    const handleSave = () => {
        const payload = {
            _id: userDetails._id,
            name,
            email,
            mobile,
            gender,
            dob: dob.toISOString(),
        };

        dispatch(updateUserDetails({ data: payload, token }))
            .unwrap()
            .then((res) => {
                Alert.alert('Success', 'Profile updated successfully!');
            })
            .catch((err) => {
                Alert.alert('Error', 'Failed to update profile. Please try again.');
            });
    };

    const copyToClipboard = () => {
        Clipboard.setString(referralCode);
        ToastAndroid.show('Copied to Clipboard!', ToastAndroid.SHORT);
    };

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView>
                <View style={styles.headerContentContainer}>
                    <View style={styles.headerTextContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Personal Details</Text>
                    </View>
                    <View style={styles.IconSubContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Icon name="settings" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileImageAndTextContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={
                                userDetails?.avatar
                                    ? { uri: `https://vtoxfambackend.onrender.com${userDetails.avatar}` }
                                    : require('../assests/NoProfileImagePic.png')
                            }
                            style={styles.profileImage}
                            resizeMode='contain'
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.carmeraIcon, { right: wp('8%'), top: hp('7%') }]}
                    >
                        <Icon name="add-a-photo" size={14} />
                    </TouchableOpacity>
                    <View style={{ right: wp('4%') }}>
                        <Text style={styles.UserIdText}>UserName</Text>
                        <Text style={styles.IdText}>{userDetails.username}</Text>
                    </View>
                </View>

                <View style={styles.inputsMainContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />

                    <Text style={styles.label}>Date Of Birth</Text>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={styles.dateText}>{dob.toDateString()}</Text>
                        <Icon name="calendar-today" size={20} color="#4CAF50" />
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                            maximumDate={new Date()}
                        />
                    )}

                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'male' && styles.genderSelected]}
                            onPress={() => setGender('male')}
                        >
                            <Text style={[styles.genderText, gender === 'male' && styles.selectedText]}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'female' && styles.genderSelected]}
                            onPress={() => setGender('female')}
                        >
                            <Text style={[styles.genderText, gender === 'female' && styles.selectedText]}>Female</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>E-Mail</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} value={mobile} onChangeText={setMobile} />

                    <Text style={styles.label}>Referral Code</Text>
                    <View style={styles.referralContainer}>
                        <TextInput style={styles.referralInput} value={referralCode} editable={false} />
                        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                            <Text style={styles.copyText}>Copy</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.verifiedButton} onPress={handleSave}>
                        <Text style={styles.verifiedText}>Save Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PersonalDetails;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#34A853',
        paddingVertical: hp('4%'),
        paddingHorizontal: wp('6%'),
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
    },
    headerText: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: '#fff',
    },
    IconSubContainer: {
        flexDirection: 'row',
        gap: wp('2%'),
    },
    profileImageAndTextContainer: {
        flexDirection: 'row',
        marginHorizontal: wp('6%'),
        marginTop: hp('3%'),
    },
    profileImageContainer: {
        width: wp('22%'),
        height: hp('10%'),
        borderRadius: 50,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    carmeraIcon: {
        backgroundColor: '#FFFFFF',
        width: wp('6%'),
        height: wp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 50,
    },
    UserIdText: {
        fontSize: RFValue(12),
        fontWeight: '500',
        color: '#8F8F8F',
        marginTop: hp('1%'),
    },
    IdText: {
        fontSize: RFValue(10),
        fontWeight: '500',
        color: '#000',
    },
    inputsMainContainer: {
        padding: wp('5%'),
    },
    label: {
        fontWeight: 'bold',
        fontSize: RFValue(12),
        color: '#999',
        marginBottom: hp('0.5%'),
        marginTop: hp('2%'),
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: wp('3%'),
        color: '#000',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: wp('3%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: '#000',
    },
    genderContainer: {
        flexDirection: 'row',
        gap: wp('2%'),
        marginTop: hp('0.5%'),
    },
    genderButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: hp('1.5%'),
        alignItems: 'center',
        borderRadius: 6,
    },
    genderSelected: {
        backgroundColor: '#3D5AFE',
        borderColor: '#3D5AFE',
    },
    genderText: {
        color: '#000',
    },
    selectedText: {
        color: '#fff',
        fontWeight: '600',
    },
    referralContainer: {
        flexDirection: 'row',
        gap: wp('2%'),
        alignItems: 'center',
    },
    referralInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: wp('3%'),
        color: '#000',
    },
    copyButton: {
        backgroundColor: '#FFA500',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1.5%'),
        borderRadius: 6,
    },
    copyText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    verifiedButton: {
        backgroundColor: '#4CAF50',
        padding: hp('2%'),
        borderRadius: 6,
        marginTop: hp('3%'),
        alignItems: 'center',
    },
    verifiedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
