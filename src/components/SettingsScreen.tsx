import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/MainStackNavigator';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
    const navigation = useNavigation< NavigationProp >();

    return (
        <View style={styles.cardContainer}>
            {/* Header */}
            <View style={styles.headerContentContainer}>
                <View style={styles.headerTextContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={RFValue(20)} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Settings</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                    <Icon name="notifications" size={RFValue(20)} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Options Card */}
            <View style={styles.card}>
                {[
                    { icon: 'person', label: 'Account Setting' },
                    { icon: 'notifications', label: 'Notifications' },
                    { icon: 'tune', label: 'App Preference' },
                    { icon: 'help', label: 'Help & FAQ' },
                    { icon: 'gavel', label: 'Legal' },
                    { icon: 'more-horiz', label: 'Others' },
                ].map(({ icon, label }, index, arr) => (
                    <React.Fragment key={label}>
                        <View >
                            <TouchableOpacity style={styles.option}>
                                <View style={styles.labelContainer}>
                                    <Icon name={icon} size={RFValue(24)} color="#000" style={styles.icon} />
                                    <Text style={styles.label}>{label}</Text>
                                </View>
                                <View>
                                    <Icon name="chevron-right" size={RFValue(24)} color="#000" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {index !== arr.length - 1 && <View style={styles.separator} />}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#34A853',
        paddingVertical: hp('5%'),
        paddingHorizontal: wp('6%'),
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: '#fff',
        marginLeft: wp('2%'), // space between icon and text
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: wp('2%'),
        elevation: 4,
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        marginHorizontal: wp('5%'),
        marginTop: hp('4%'),
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: wp('4%'),
    },
    label: {
        fontSize: RFValue(16),
        color: '#000',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
});
