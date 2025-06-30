import React, { useCallback, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPLans } from '../store/features/adminPlans/adminPlansThunk';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const columnWidths = {
    planName: 120,
    roiPercent: 80,
    minAmount: 120,
    durationDays: 100,
    autoPayout: 100,
};

const PlansScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { plans, loading, error } = useSelector((state) => state.plans);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllPLans())
                .unwrap()
                .then((data) => {
                    console.log('fetchAllPLans successful');
                    console.log('Fetched data:', data);
                })
                .catch((err) => console.error('fetchAllPLans failed:', err));
        }, [dispatch])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <AdminTemplateHeaderPart name='Plans' paddingBottom={20} />
                <View style={styles.container}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#4CAF50" />
                    ) : error ? (
                        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
                    ) : (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.HorizentalScrollContainer}
                        >
                            <View style={styles.TableContainer}>
                                <View style={[styles.row, styles.headerRow]}>
                                    <Text style={[styles.headerCell, { width: columnWidths.planName }]}>Plan Name</Text>
                                    <Text style={[styles.headerCell, { width: columnWidths.roiPercent }]}>ROI (%)</Text>
                                    <Text style={[styles.headerCell, { width: columnWidths.minAmount }]}>Min Amount</Text>
                                    <Text style={[styles.headerCell, { width: columnWidths.durationDays }]}>Duration</Text>
                                    <Text style={[styles.headerCell, { width: columnWidths.autoPayout }]}>Auto Payout</Text>
                                    <Text style={[styles.headerCell, { width: columnWidths.autoPayout }]}>Actions</Text>
                                </View>

                                {plans.map((plan, index) => (
                                    <View style={styles.row} key={plan._id || index}>
                                        <Text style={[styles.cell, { width: columnWidths.planName }]}>{plan.name}</Text>
                                        <Text style={[styles.cell, { width: columnWidths.roiPercent }]}>{plan.roiPercent}%</Text>
                                        <Text style={[styles.cell, { width: columnWidths.minAmount }]}>Rs.{plan.minAmount}</Text>
                                        <Text style={[styles.cell, { width: columnWidths.durationDays }]}>{plan.durationDays}d</Text>
                                        <Text style={[styles.cell, { width: columnWidths.autoPayout }]}>
                                            {plan.autoPayout ? 'Yes' : 'No'}
                                        </Text>
                                        <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
                                            <TouchableOpacity onPress={() => navigation.navigate('UpdatePlan', { plan })}>
                                                <Text style={styles.link}>update</Text>
                                            </TouchableOpacity>
                                            {/* <Text style={styles.reject}>Remove</Text> */}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    )}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AddNewInvestments')} style={styles.addNewInvestContainer}>
                    <Text style={styles.addNewInvestText}>Add New{'\n'}Investemnts</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PlansScreen;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#F3F3F3",
        margin: 10,
        borderRadius: 6,
    },
    HorizentalScrollContainer: {
        backgroundColor: '#fff',
    },
    TableContainer: {},
    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    headerRow: {
        backgroundColor: '#4CAF50',
    },
    headerCell: {
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 10,
    },
    cell: {
        paddingHorizontal: 10,
    },
    link: {
        color: 'blue',
        marginRight: 10,
        textDecorationLine: 'underline',
    },
    reject: {
        color: 'red',
        textDecorationLine: 'underline',
    },
    addNewInvestContainer: {
        margin: 20,
        backgroundColor: "#FF8800",
        width: "30%",
        borderRadius: 6,
        padding: 10,
        alignItems: 'center'
    },
    addNewInvestText: {
        textAlign: 'center',
        fontSize: RFValue(14),
        color: '#fff',
        fontWeight: '500'
    }
});
