import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchDashboard } from '../store/features/adminDashboard/adminDashboardThunk';

const DashBoardScreen = () => {
    const inset = useSafeAreaInsets();
    const { height, width } = Dimensions.get('window');
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.auth.token);
    const { data, loading, error } = useSelector((state: RootState) => state.adminDashboard);
    const user = useSelector((state) => state.auth.user);
    const adminName = user?.name;

    useEffect(() => {
        if (token) {
            dispatch(fetchDashboard())
                .unwrap()
                .then((data) => {
                    console.log('fetchDashboard successful');
                })
                .catch((err) => console.error('fetchUser failed:', err));
        }
        else {
            console.log("No token available yet, skipping fetch");
        }
    }, [dispatch, token])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollViewContent, { paddingBottom: inset.bottom + 50 }]}
            >
                <AdminTemplateHeaderPart name={`Hii ${adminName}`} />
                <View style={styles.dashboardWrapper}>
                    <View style={[styles.buttonsContainer, { bottom: height * 0.038 }]}>
                        <TouchableOpacity style={styles.buttons}>
                            <Icon name='verified' size={20} color='#34A853' />
                            <Text style={styles.buttonsText}>Approve{'\n'}Withdrawal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons}>
                            <Icon name='schedule' size={20} color='#FF8800' />
                            <Text style={styles.buttonsText}>View Today’s{'\n'}Activity</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons}>
                            <Icon name='add-box' size={20} color='#FF8800' />
                            <Text style={styles.buttonsText}>Add New{'\n'}Investment</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.dashboardTitle}>Dashboard</Text>

                    <View style={styles.ongoingDashboardCardMainContainer}>
                        <View style={styles.ongoingDashboardCardContainer}>
                            <View style={[styles.ongoingDashboardCard, { backgroundColor: '#ACE6F1' }]}>
                                <View style={styles.cardContainer}>
                                    <Icon name="group" size={36} color="#007A8A" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.label}>Total Users</Text>
                                        <Text style={styles.value}>{data?.totalUsers}</Text>
                                    </View>
                                </View>
                                <Text style={styles.ongoingDashboardCardText}>● +153 new today</Text>
                                <Text style={styles.ongoingDashboardCardText}>● 9,204 active this week (74%)</Text>
                                <Text style={styles.ongoingDashboardCardText}>● ↑ 4.2% growth vs last week</Text>
                            </View>

                            <View style={[styles.ongoingDashboardCard, { backgroundColor: '#FBE7A1' }]}>
                                <View style={styles.cardContainer}>
                                    <Icon name="upload" size={45} color="#D4A800" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.label}>Total Deposits</Text>
                                        <Text style={styles.value}>{data?.totalDeposits}</Text>
                                    </View>
                                </View>
                                <Text style={styles.ongoingDashboardCardText}>● +$12,300 today</Text>
                                <Text style={styles.ongoingDashboardCardText}>● 1,823 successful deposits this week</Text>
                                <Text style={styles.ongoingDashboardCardText}>● ↑ 6.7% growth vs last week</Text>
                            </View>
                        </View>

                        <View style={styles.ongoingDashboardCardContainer}>
                            <View style={[styles.ongoingDashboardCard, { backgroundColor: '#E9D5FF' }]}>
                                <View style={styles.cardContainer}>
                                    <Icon name="download" size={45} color="#8B5CF6" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.label}>Total Withdraws</Text>
                                        <Text style={styles.value}>{data?.totalWithdrawals}</Text>
                                    </View>
                                </View>
                                <Text style={styles.ongoingDashboardCardText}>● $8,100 withdrawn today</Text>
                                <Text style={styles.ongoingDashboardCardText}>● Pending: $22,450</Text>
                                <Text style={styles.ongoingDashboardCardText}>● ↓ 1.13% vs last week</Text>
                            </View>

                            <View style={[styles.ongoingDashboardCard, { backgroundColor: '#FBC6C6' }]}>
                                <View style={styles.cardContainer}>
                                    <Icon name="group-add" size={45} color="#D94A4A" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.label}>Total Referrals</Text>
                                        <Text style={styles.value}>{data?.totalReferrals}</Text>
                                    </View>
                                </View>
                                <Text style={styles.ongoingDashboardCardText}>● +78 new today</Text>
                                <Text style={styles.ongoingDashboardCardText}>● 1,560 active referrers</Text>
                                <Text style={styles.ongoingDashboardCardText}>● Top earner: User #1023 ($3,200)</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.SignupTrendText}>Signup Trend</Text>
                    <View style={styles.SignupTrendImageMainContainer}>
                        <View style={styles.TextContainer}>
                            <Text style={styles.TextHeader}>Users</Text>
                            <Text style={styles.TextValues}>80</Text>
                            <Text style={styles.TextValues}>60</Text>
                            <Text style={styles.TextValues}>40</Text>
                            <Text style={styles.TextValues}>20</Text>
                            <Text style={styles.TextValues}>0</Text>
                        </View>

                        <View style={[styles.SignupTrendImageContainer, { left: width * 0.01 }]}>
                            <Image
                                source={require('../assests/signUpTerndImageDays.png')}
                                style={styles.SignupTrendImageDays}
                            />
                            <Image
                                source={require('../assests/signUpTrendImage.png')}
                                style={styles.SignupTrendImage}
                            />
                            <View style={[styles.TextTimeContainer, { bottom: height * 0.01 }]}>
                                <Text style={styles.TextValues}>11 am</Text>
                                <Text style={styles.TextValues}>12 pm</Text>
                                <Text style={styles.TextValues}>1 pm</Text>
                                <Text style={styles.TextValues}>2 pm</Text>
                                <Text style={styles.TextValues}>3 pm</Text>
                            </View>
                            <Text style={[styles.TextHeader, { right: width * 0.14 }]}>Time -></Text>
                        </View>
                    </View>
                    <Text style={styles.SignupTrendText}>Investment Plan Usage</Text>

                    <View style={styles.card}>
                        {/* Left Side: Legend */}
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.colorBox, { backgroundColor: '#34A853' }]} />
                                <View>
                                    <Text style={styles.label}>Basic Plan</Text>
                                    <Text style={styles.percentage}>45%</Text>
                                </View>
                            </View>

                            <View style={styles.legendItem}>
                                <View style={[styles.colorBox, { backgroundColor: '#F4B400' }]} />
                                <View>
                                    <Text style={styles.label}>Gold Plan</Text>
                                    <Text style={styles.percentage}>20%</Text>
                                </View>
                            </View>

                            <View style={styles.legendItem}>
                                <View style={[styles.colorBox, { backgroundColor: '#A259FF' }]} />
                                <View>
                                    <Text style={styles.label}>Premium Plan</Text>
                                    <Text style={styles.percentage}>35%</Text>
                                </View>
                            </View>
                        </View>

                        {/* Right Side: Static Pie Chart Image */}
                        <View style={styles.chartImageContainer}>
                            <Image
                                source={require('../assests/investment_plan_pie_chart.png')}
                                style={[styles.chartImage, { right: width * 0.15 }]}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
    scrollViewContent: {
        backgroundColor: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
        borderRadius: 6,
        elevation: 6,
        width: 90
    },
    buttonsText: {
        textAlign: 'center'
    },
    dashboardWrapper: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    dashboardTitle: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
    },
    SignupTrendText: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        marginTop: 40
    },
    ongoingDashboardCardMainContainer: {},
    ongoingDashboardCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    ongoingDashboardCard: {
        width: 160,
        borderRadius: 6,
        padding: 15,
        marginVertical: 10,
        shadowRadius: 4,
        elevation: 5,
        shadowColor: '#000',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#000',
        fontSize: RFValue(10),
        fontWeight: '400'
    },
    value: {
        color: '#000',
        fontSize: RFValue(14),
        fontWeight: '400'
    },
    ongoingDashboardCardText: {
        fontSize: RFValue(8)
    },
    SignupTrendImageMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 25,
        overflow: 'hidden',
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    SignupTrendImageContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: 200,
        justifyContent: 'center',
    },
    SignupTrendImage: {
        width: '80%',
        height: '70%',
        resizeMode: 'contain'
    },
    SignupTrendImageDays: {
        width: '80%',
        resizeMode: 'contain'
    },
    TextContainer: {
        gap: 8,
        marginBottom: 15
    },
    TextTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    TextHeader: {
        color: '#8F8F8F',
        fontSize: RFValue(12),
        fontWeight: '300',
        textAlign: 'center'
    },
    TextValues: {
        color: '#8F8F8F',
        fontSize: RFValue(10),
        fontWeight: '400'
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: '600',
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 20,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    legendContainer: {
        gap: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    colorBox: {
        width: 18,
        height: 18,
        borderRadius: 4,
    },
    label: {
        fontSize: RFValue(14),
        fontWeight: '500',
        color: '#000',
    },
    percentage: {
        fontSize: RFValue(13),
        fontWeight: '400',
        color: '#000',
    },
    chartImageContainer: {
        width: Dimensions.get('window').width * 1,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
