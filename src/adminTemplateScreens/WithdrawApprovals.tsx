import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';

const withdrawalRequests = [
    {
        id: '1',
        name: 'Aman',
        time: '9:00 A.M.',
        message: 'Aman requested to withdraw balance',
        image: require('../assests/NoProfileImagePic.png'),
    },
    {
        id: '2',
        name: 'Aman',
        time: '9:00 A.M.',
        message: 'Aman requested to withdraw balance',
        image: require('../assests/NoProfileImagePic.png'),
    },
    // Add more requests dynamically
];

const WithdrawalRequestItem = ({ item, onApprove, onCancel }) => (
    <View style={styles.card}>
        <View style={styles.header}>
            <View style={styles.profileContainer}>
                <Image source={item.image} style={styles.profileImage} />
                <View style={styles.userDetails}>
                    <Text style={styles.newBadge}>New</Text>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
            </View>
            <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.approveButton}
                onPress={() => onApprove(item.id)}
            >
                <Text style={styles.approveButtonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => onCancel(item.id)}
            >
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const WithdrawApprovals = () => {
    const handleApprove = (id) => {
        console.log(`Approved withdrawal request ID: ${id}`);
    };

    const handleCancel = (id) => {
        console.log(`Canceled withdrawal request ID: ${id}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <AdminTemplateHeaderPart name={'Withdraw Approvals'} paddingBottom={20} />
                <View style={styles.list}>
                    {withdrawalRequests.map((item) => (
                        <WithdrawalRequestItem
                            key={item.id}
                            item={item}
                            onApprove={handleApprove}
                            onCancel={handleCancel}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WithdrawApprovals

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollView: {
        backgroundColor: '#fff'
    },
    list: {
        padding: 10,
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    userDetails: {
        flexDirection: 'column'
    },
    newBadge: {
        backgroundColor: '#6CC24A',
        color: '#fff',
        fontSize: 12,
        borderRadius: 5,
        paddingHorizontal: 5,
        alignSelf: 'flex-start',
        marginBottom: 2
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#3A3A3A'
    },
    message: {
        fontSize: 14,
        color: '#6A6A6A'
    },
    time: {
        fontSize: 12,
        color: '#6A6A6A'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    approveButton: {
        backgroundColor: '#FF9500',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10
    },
    approveButtonText: {
        color: '#fff',
        fontSize: 14
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#FF9500',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 5
    },
    cancelButtonText: {
        color: '#FF9500',
        fontSize: 14
    }
})