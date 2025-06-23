import {
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { fetchReferralCode } from '../store/features/refferal/refferalThunk';
import { AppDispatch } from '../store/store';
import Clipboard from '@react-native-clipboard/clipboard';

const ReferralPageUpparPart = () => {
    const insets = useSafeAreaInsets();
    const { height } = Dimensions.get('window');
    const [referralCode, setReferralCode] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchReferralCode())
            .unwrap()
            .then((data) => {
                setReferralCode(data.code);
            })
            .catch((error) => {
                console.error('❌ Error fetching referral code:', error);
            });
    }, [dispatch]);

    const copyToClipboard = () => {
        Clipboard.setString(referralCode);
        ToastAndroid.show('Copied to Clipboard!', ToastAndroid.SHORT);
    };

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ height: hp('64.5%') }}>
                    <ImageBackground
                        source={require('../assests/refferalPageBGImage.png')}
                        style={styles.BGImage}
                        resizeMode='stretch'
                    >
                        <Text style={styles.ReferHeaderText}>Refer Your Friends {'\n'}And Earn</Text>

                        <Image
                            source={require('../assests/refferalPageBoyGirlImage.png')}
                            style={[styles.refferralImage, { bottom: hp('3%') }]}
                        />

                        <View style={[styles.wrapper, { bottom: hp('3%') }]}>
                            <View style={styles.couponContainer}>
                                <View style={styles.codeSection}>
                                    <Text style={styles.codeText}>{referralCode}</Text>
                                </View>
                                <TouchableOpacity onPress={copyToClipboard} style={styles.copySection}>
                                    <Text style={styles.copyText}>COPY</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.shareNow}>SHARE NOW</Text>
                        </View>

                        <View style={styles.socialIconsContainer}>
                            <TouchableOpacity style={styles.IconImage}>
                                <Image
                                    source={require('../assests/refferalPageWhatsappImage.png')}
                                    resizeMode='contain'
                                    style={styles.iconImageStyle}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.IconImage, { bottom: hp('2%') }]}>
                                <Image
                                    source={require('../assests/refferalPageTelegramImage.png')}
                                    resizeMode='contain'
                                    style={styles.iconImageStyle}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.IconImage}>
                                <Image
                                    source={require('../assests/refferalPageSmsImage.png')}
                                    resizeMode='contain'
                                    style={styles.iconImageStyle}
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReferralPageUpparPart;

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#fff',
    },
    BGImage: {
        width: '100%',
        height: '100%',
    },
    ReferHeaderText: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
        marginTop: hp('2%'),
    },
    refferralImage: {
        resizeMode: 'contain',
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
    },
    couponContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: wp('10%'),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
        width: wp('70%'),
        maxWidth: 320,
        height: hp('7%'),
    },
    codeSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    codeText: {
        fontSize: RFValue(16),
        fontWeight: '400',
        color: '#000',
    },
    copySection: {
        flex: 1,
        backgroundColor: '#FF9800',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyText: {
        fontSize: RFValue(16),
        fontWeight: '400',
        color: '#fff',
    },
    shareNow: {
        marginTop: hp('2%'),
        fontSize: RFValue(18),
        color: '#fff',
        fontWeight: '400',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: hp('2%'),
        gap: wp('2%'),
    },
    IconImage: {
        backgroundColor: '#FFFFFF',
        padding: wp('3%'),
        borderRadius: wp('5%'),
        width: wp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
    iconImageStyle: {
        width: wp('8.5%'),
        height: wp('8.5%'),
    },
});
