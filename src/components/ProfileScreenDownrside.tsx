import { Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../store/features/auth/authThunk';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/MainStackNavigator';
import { AppDispatch } from '../store/store';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreenDownrside = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logoutUser());
        ToastAndroid.show('Logged Out Successfully!', ToastAndroid.SHORT);
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')} style={styles.option}>
                    <Icon name="person" size={RFValue(24)} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Personal Details</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity onPress={() => navigation.navigate('WalletInfo')} style={styles.option}>
                    <Icon name="wallet" size={RFValue(24)} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Wallet Info</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.option}>
                    <Icon name="star" size={RFValue(24)} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Membership Level</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.option}>
                    <Icon name="description" size={RFValue(24)} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Agreement</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')} style={styles.option}>
                    <Icon name="history" size={RFValue(24)} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Transaction History</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.option}>
                    <Icon name="settings" size={RFValue(24)} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Settings</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
                <Text style={styles.signOutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('0%'),
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        width: wp('90%'),
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
        marginVertical: hp('0.5%'),
    },
    icon: {
        marginRight: wp('5%'),
    },
    label: {
        fontSize: RFValue(14),
        color: '#000',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
    signOutButton: {
        backgroundColor: '#FF8800',
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('15%'),
        borderRadius: 6,
        marginTop: hp('5%'),
        alignSelf: 'center',
    },
    signOutText: {
        color: '#fff',
        fontSize: RFValue(16),
        fontWeight: '500',
    },
});

export default ProfileScreenDownrside;
