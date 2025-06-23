import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Alert,
    Dimensions,
} from 'react-native';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/native';

const UserViewScreen = () => {
    const { width, height } = Dimensions.get('window');
    const route = useRoute();
    const { user } = route.params;

    console.log("users Vieew Data: ", user)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <AdminTemplateHeaderPart name="User" paddingBottom={20} />

                <View style={styles.container}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
                        <Icon style={{ top: height * 0.005 }} name={'error'} color={'#DB0004'} size={24} />
                        <View style={styles.alertBox}>
                            <Text style={styles.alertText}>{user.username} Requested to withdraw balance</Text>
                            <Button color={"#FF8800"} title="View" />
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={styles.profileSectionContainet}>
                            <View style={styles.profileSection}>
                                <View style={styles.profilePic}>
                                    <Image
                                        source={require('../assests/NoProfileImagePic.png')}
                                        style={styles.profileImage}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={{ gap: 3 }}>
                                    <Text style={styles.userId}>{user.username}</Text>
                                    <Text style={styles.userLabel}>User ID</Text>
                                </View>
                            </View>
                            <View style={styles.wallet}>
                                <Text style={styles.walletLabel}>Wallet Balance</Text>
                                <Text style={styles.walletAmount}>Rs. {user.walletBalance}</Text>
                            </View>
                        </View>

                        <Text style={styles.LableText}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={user.name}
                            editable={false}
                        />
                        <Text style={styles.LableText}>E-Mail</Text>
                        <TextInput
                            style={styles.input}
                            value={user.email}
                            editable={false}
                        />
                        <Text style={styles.LableText}>Phone No</Text>
                        <TextInput
                            style={styles.input}
                            value={user.mobile}
                            editable={false}
                        />
                        <Text style={styles.LableText}>Referral Code</Text>
                        <TextInput
                            style={styles.input}
                            value={user.code}
                            editable={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default UserViewScreen;

const styles = StyleSheet.create({
    container: { padding: 16 },
    loading: { textAlign: 'center', marginTop: 20 },
    error: { color: 'red', textAlign: 'center', marginTop: 20 },
    alertBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E5A400BD',
        marginBottom: 16,
        borderRadius: 4,
        width: '90%'
    },
    alertText: {
        fontWeight: '400',
        color: '#000',
        paddingLeft: 15
    },
    profileSectionContainet: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 16,
        flexDirection: 'row',
        gap: 20
    },
    profilePic: {
        width: 80,
        height: 80,
        backgroundColor: '#ccc',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userId: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '500'
    },
    userLabel: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500'
    },
    wallet: {
        backgroundColor: '#FFA726',
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    walletLabel: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500'
    },
    walletAmount: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 12,
    },
    LableText: {
        paddingBottom: 5,
        paddingLeft: 3,
        fontSize: RFValue(12),
        color: '#8F8F8F',
        marginTop: 5
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
});
