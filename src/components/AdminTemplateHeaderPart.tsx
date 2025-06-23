import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    Image,
    Alert,
    ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../store/features/auth/authThunk';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppDispatch } from '../store/store';


const AdminTemplateHeaderPart = ({ name, paddingBottom = 40 }:{name:string, paddingBottom:number}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation<any>();
    const { height } = Dimensions.get('window');
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logoutUser());
        ToastAndroid.show('Logged Out Successfully!', ToastAndroid.SHORT);
        // Navigate to the login screen or appropriate screen after logout0000
        navigation.getParent()?.navigate('Login');
    };

    const handleNavigate = (screen: string) => {
        setMenuVisible(false);
        navigation.navigate(screen);
    };

    return (
        <SafeAreaView>
            <View style={[styles.headerContainer, { paddingBottom }]}>
                <Text style={styles.greetingText}>{name}</Text>

                <View style={styles.iconGroup}>
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search..."
                            style={styles.searchInput}
                            placeholderTextColor="#999"
                        />
                    </View>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="notifications" size={26} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
                        <Icon name="menu" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Menu Modal */}
            <Modal transparent visible={menuVisible} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.menu}>
                                <View style={styles.MenuItemImageContainer}>
                                    <Image
                                        source={require('../assests/MenuHeadIcon.png')}
                                        style={styles.MenuItemImage}
                                    />
                                </View>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('Home')}>
                                    <Icon name='dashboard' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Dashboard</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('Users')}>
                                    <Icon name='people' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Users</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('PlansScreen')}>
                                    <Icon name='work' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Plans</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('Investments')}>
                                    <Icon name='work' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Investments</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('SpinLogs')}>
                                    <Icon name='autorenew' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Spin Logs</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('Deposits')}>
                                    <Icon name='file-upload' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Deposits</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('WithdrawApprovals')}>
                                    <Icon name='file-download' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Withdraw Approvals</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('Withdrawals')}>
                                    <Icon name='file-download' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Withdrawals</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButtons} onPress={() => handleNavigate('Settings')}>
                                    <Icon name='settings' size={24} color='#8F8F8F' />
                                    <Text style={styles.menuItem}>Settings</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleLogout} style={styles.menuLogoutButton}>
                                    <Text style={styles.menuLogoutButtonText}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
};

export default AdminTemplateHeaderPart;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#34A853',
        paddingHorizontal: wp('4%'),
        paddingTop: hp('5%'),
    },
    greetingText: {
        fontSize: RFValue(20),
        color: '#fff',
        fontWeight: '400',
    },
    iconGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('1%'),
        width: wp('70%'),
    },
    searchIcon: {
        marginRight: wp('2%'),
    },
    searchInput: {
        flex: 1,
        fontSize: RFValue(14),
        color: '#333',
        paddingVertical: 0,
    },
    iconButton: {
        marginLeft: wp('3%'),
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: hp('8%'),
        paddingRight: wp('2%'),
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    menu: {
        backgroundColor: '#fff',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('3%'),
        width: wp('50%'),
        elevation: 5,
    },
    MenuItemImageContainer: {
        width: wp('8%'),
        height: wp('8%'),
        alignSelf: 'center',
        marginVertical: hp('1%'),
    },
    MenuItemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    menuButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
    },
    menuItem: {
        fontSize: RFValue(16),
        paddingVertical: hp('1%'),
        color: '#333',
    },
    menuLogoutButton: {
        marginVertical: hp('2%'),
        backgroundColor: '#D9D9D9',
        borderRadius: wp('2%'),
    },
    menuLogoutButtonText: {
        fontSize: RFValue(16),
        paddingVertical: hp('1%'),
        color: '#000',
        textAlign: 'center',
        fontWeight: '500',
    },
});

