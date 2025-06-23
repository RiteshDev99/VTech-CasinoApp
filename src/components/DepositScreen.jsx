import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../store/features/auth/authThunk';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DepositScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { basicUser, userDetails } = useSelector(state => state.auth);

    useEffect(() => {
        if (basicUser?._id && !userDetails) {
            dispatch(getUserDetails(basicUser._id));
        }
        console.log('Withdrawal Screen User data:', userDetails);
    }, [basicUser, userDetails]);

    if (!userDetails) return null;

    const [selectedMethod, setSelectedMethod] = useState(null);

    const methods = [
        { id: 'bank', label: 'Bank', icon: require('../assests/WithdrawScreenBankImage.png') },
        { id: 'upi', label: 'UPI', icon: require('../assests/WithdrawScreenUpiImage.png') },
        { id: 'crypto', label: 'Crypto', icon: require('../assests/WithdrawScreenCryptoImage.png') },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.UpperContainer}>
                <View style={styles.IconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon style={styles.Icon} name="arrow-back" size={RFValue(24)} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={styles.Icon} name="notifications" size={RFValue(24)} />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Hi {userDetails.name}, cash out your {'\n'}rewards fast and safe!
                        </Text>
                        <Text style={styles.balanceText}>Balance: ${userDetails?.wallet?.balance}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require('../assests/WithdrawalScreenImage.png')}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.DownContainer}>
                <Text style={styles.heading}>Deposit</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter amount (₹100 min)"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                />

                <Text style={styles.selectText}>Select (2% fee, ₹10 min)</Text>

                <View style={styles.optionsRow}>
                    {methods.map(method => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.optionBox,
                                selectedMethod === method.id && styles.selectedBox,
                            ]}
                            onPress={() => setSelectedMethod(method.id)}>
                            <Image source={method.icon} style={styles.optionIcon} />
                            <Text style={styles.optionText}>{method.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.otpButtonContainer}>
                    <TouchableOpacity style={styles.otpButton}>
                        <Text style={styles.otpButtonText}>Send OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DepositScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    UpperContainer: {
        backgroundColor: '#34A853',
        paddingTop: hp('4%'),
        paddingHorizontal: wp('5%'),
        position: 'relative',  // Make this relative so children can use absolute positioning
    },
    IconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    Icon: {
        color: '#fff',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('100%'),
    },
    textContainer: {
        flex: 1,
        paddingRight: wp('2%'),
    },
    text: {
        color: '#fff',
        fontSize: RFValue(14),
        fontWeight: '400',
    },
    balanceText: {
        color: '#fff',
        fontSize: RFValue(24),
        fontWeight: '300',
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
    },
    imageContainer: {
        position: 'absolute',  // Absolutely position the image
        bottom: 0,             // Align it to the bottom
        right: wp('4%'),       // Align it to the right (same horizontal padding as container)
        width: wp('40%'),
        height: hp('20%'),
    },
    image: {
        top: hp('4.5%'),
        width: '100%',
        height: '100%',
    },
    DownContainer: {
        marginHorizontal: wp('4%'),
        marginVertical: hp('2%'),
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: wp('4%'),
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    heading: {
        fontSize: RFValue(22),
        fontWeight: '600',
        color: '#1c3b2f',
        marginBottom: hp('2%'),
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.2%'),
        fontSize: RFValue(16),
        marginBottom: hp('2%'),
    },
    selectText: {
        fontSize: RFValue(14),
        marginBottom: hp('1%'),
        color: '#333',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp('2%'),
        marginBottom: hp('2%'),
    },
    optionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: wp('2%'),
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        marginRight: wp('2%'),
        marginBottom: hp('1%'),
    },
    selectedBox: {
        borderColor: '#1c3b2f',
        backgroundColor: '#e8f5e9',
    },
    optionIcon: {
        width: wp('6%'),
        height: wp('6%'),
        resizeMode: 'contain',
        marginRight: wp('2%'),
    },
    optionText: {
        fontSize: RFValue(16),
        fontWeight: '500',
    },
    otpButtonContainer: {
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    otpButton: {
        backgroundColor: '#ff8c00',
        borderRadius: 8,
        paddingVertical: hp('1.5%'),
        alignItems: 'center',
        width: wp('60%'),
    },
    otpButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: RFValue(16),
    },
});
