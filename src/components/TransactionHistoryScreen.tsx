import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type TransactionType = 'all' | 'deposit' | 'withdraw' | 'bonus';

const filterTabs = [
    { label: 'All', key: 'all' },
    { label: 'Deposit', key: 'deposit' },
    { label: 'Withdraw', key: 'withdraw' },
    { label: 'Bonus', key: 'bonus' },
] as const;

const transactions = [
    { date: '1 May 2025', type: 'Deposit', amount: '₹1,000', status: 'Completed' },
    { date: '2 May 2025', type: 'Withdraw', amount: '₹520', status: 'Pending' },
    { date: '2 May 2025', type: 'Bonus', amount: '₹1,000', status: 'Completed' },
    { date: '3 May 2025', type: 'Deposit', amount: '₹1,000', status: 'Completed' },
    { date: '4 May 2025', type: 'Bonus', amount: '₹1,000', status: 'Completed' },
];

const TransactionHistoryScreen = () => {
    const navigation = useNavigation();
    const [selectedType, setSelectedType] = useState<TransactionType>('all');

    const filteredTransactions =
        selectedType === 'all'
            ? transactions
            : transactions.filter(t => t.type.toLowerCase() === selectedType);

    const renderItem = ({ item }: { item: typeof transactions[number] }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={styles.cell}>{item.amount}</Text>
            <Text
                style={[
                    styles.cell,
                    item.status === 'Pending' ? styles.pending : styles.completed,
                ]}
            >
                {item.status}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={RFValue(24)} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Transaction History</Text>
                </View>
                <TouchableOpacity>
                    <Icon name="settings" size={RFValue(24)} color="#fff" />
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>All Transactions</Text>

            <View style={styles.container}>
                <View style={styles.tabs}>
                    {filterTabs.map(tab => (
                        <View key={tab.key} style={styles.tabButtonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    selectedType === tab.key && styles.activeTabButton,
                                ]}
                                onPress={() => setSelectedType(tab.key)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        selectedType === tab.key && styles.activeTabText,
                                    ]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <View style={styles.tableHeader}>
                    <Text style={styles.headerCell}>Date</Text>
                    <Text style={styles.headerCell}>Type</Text>
                    <Text style={styles.headerCell}>Amount</Text>
                    <Text style={styles.headerCell}>Status</Text>
                </View>

                <FlatList
                    data={filteredTransactions}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: hp('4%') }}
                />
            </View>
        </SafeAreaView>
    );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#34A853',
        paddingVertical: hp('4%'),
        paddingHorizontal: wp('6%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
    },
    headerText: {
        color: '#fff',
        fontSize: RFValue(18),
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: '#fff',
        marginHorizontal: wp('4%'),
        padding: wp('4%'),
        borderRadius: 10,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: RFValue(16),
        fontWeight: '400',
        marginVertical: hp('3%'),
        marginHorizontal: wp('4%'),
        color: '#444',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        paddingVertical: hp('1%'),
        marginBottom: hp('1.5%'),
    },
    tabButtonContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        borderRadius: 4,
        marginHorizontal: wp('0.5%'),
    },
    tabButton: {
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    activeTabButton: {
        backgroundColor: '#34A853',
    },
    tabText: {
        color: '#555',
        fontSize: RFValue(12),
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#84D299',
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('2%'),
        borderRadius: 6,
        marginBottom: hp('1%'),
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: RFValue(12),
        textAlign: 'left',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: hp('1.5%'),
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    cell: {
        flex: 1,
        fontSize: RFValue(13),
        textAlign: 'left',
    },
    pending: {
        color: '#F57C00',
        fontWeight: '500',
    },
    completed: {
        color: '#388E3C',
        fontWeight: '500',
    },
});
