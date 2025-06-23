import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getUserDetails } from '../store/features/auth/authThunk';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/MainStackNavigator';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WalletInfoScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { basicUser, userDetails } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (basicUser?._id && !userDetails) {
            dispatch(getUserDetails(basicUser._id));
        }
        console.log("Withdrawal Screen User  data:", userDetails);
    }, [basicUser, userDetails]);

    if (!userDetails) return null;

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView>
                <View style={styles.headerContentContainer}>
                    <View style={styles.headerTextContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={RFValue(20)} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Wallet Info</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Icon name="settings" size={RFValue(24)} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.depositAndWithdrawContainer}>
                    <TouchableOpacity style={[styles.depositTextBox, { backgroundColor: '#FDBE00', borderTopLeftRadius: hp('0.8%'), borderBottomLeftRadius: hp('0.8%') }]}>
                        <Text style={styles.depositText}>Pending Withdrawals ₹100 (processing)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.depositTextBox, { backgroundColor: '#2E7D32', borderTopRightRadius: hp('0.8%'), borderBottomRightRadius: hp('0.8%') }]}>
                        <Text style={styles.depositText}>Total Withdrawn{'\n'}
                            <Text>₹1,150</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: RFValue(20), marginLeft: wp('5%') }}>Wallet</Text>

                <View style={styles.card}>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>Main Balance: ${userDetails?.wallet?.balance}</Text>
                        <Text style={styles.cardText}>Locked Balance: ${userDetails?.wallet?.lockedBalance}</Text>
                        <Text style={styles.cardText}>Binance Wallet: 0x****1234</Text>
                        <Text style={styles.cardText}>Bonus Cash: ${userDetails?.wallet?.bonus ?? '0'}</Text>
                    </View>
                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.ButtonText}>Add/Update Wallet</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: RFValue(20), marginLeft: wp('5%'), marginTop: hp('1%') }}>Coupons Available:  2</Text>

                <View style={styles.CuponCardContainer}>
                    <View style={styles.cuponCard}>
                        <Image source={require('../assests/homepageBigWinImage.png')} style={styles.cardImage} />
                        <TouchableOpacity style={[styles.playButton, { top: hp('8%'), left: wp('10%') }]}>
                            <Text style={styles.playButtonText}>Clam Now</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cuponCard}>
                        <Image source={require('../assests/homepageGirlScrollImage.png')} style={styles.cardImage} />
                        <TouchableOpacity style={[styles.playButton, { top: hp('8%'), left: wp('10%') }]}>
                            <Text style={styles.playButtonText}>Claimed</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default WalletInfoScreen;

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
        gap: wp('2.5%'),
    },
    headerText: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: '#fff',
    },
    depositAndWithdrawContainer: {
        width: wp('80%'),
        marginVertical: hp('5%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    depositTextBox: {
        width: wp('40%'),
        paddingVertical: hp('2.5%'),
    },
    depositText: {
        fontSize: RFValue(14),
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: hp('1%'),
        padding: hp('2.5%'),
        marginHorizontal: wp('5%'),
        marginTop: hp('3.5%'),
    },
    cardTextContainer: {
        gap: hp('0.5%'),
    },
    cardText: {
        fontSize: RFValue(14),
        fontWeight: '400',
    },
    Button: {
        backgroundColor: '#FF8800',
        paddingVertical: hp('1%'),
        marginTop: hp('2%'),
        borderRadius: hp('0.5%'),
    },
    ButtonText: {
        fontSize: RFValue(10),
        textAlign: 'center',
        color: '#fff',
    },
    CuponCardContainer: {
        flexDirection: 'row',
    },
    cuponCard: {
        marginTop: hp('2.5%'),
        marginRight: wp('4%'),
        marginLeft: wp('5%'),
        width: wp('38%'),
        borderRadius: hp('1%'),
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        opacity: 0.4,
    },
    cardImage: {
        width: '100%',
        height: hp('15%'),
        resizeMode: 'cover',
    },
    playButton: {
        backgroundColor: '#34A853',
        paddingVertical: hp('1.5%'),
        width: wp('20%'),
        alignItems: 'center',
        position: 'absolute',
        borderRadius: hp('1%'),
    },
    playButtonText: {
        color: '#fff',
        fontSize: RFValue(8),
        fontWeight: '600',
    },
});
