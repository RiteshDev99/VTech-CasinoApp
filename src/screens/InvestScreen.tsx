import { Alert, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveInvestments, fetchInvestmentsHistory, getPlans, getSubscribeInvestments } from '../store/features/investment/investmentThunk';
import { AppDispatch, RootState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { getUserDetails } from '../store/features/auth/authThunk';
import { fetchWalletBalance } from '../store/features/wallet/walletThunk';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/MainStackNavigator';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface InvestmentPlan {
  _id?: string;
  name?: string;
  roiPercent?: number;
  minAmount?: number;
  durationDays?: number;
  autoPayout?: boolean;
}

interface PlanId {
  name?: string;
}

interface InvestmentHistoryItem {
  _id?: string;
  planId?: PlanId;
  amount?: number;
  endDate?: string;
  status?: string;
  // Add other properties as needed
}

interface ActiveInvestment {
  _id?: string;
  planId?: PlanId;
  amount?: number;
  earnings?: number;
  startDate?: string;
  endDate?: string;
  progress?: number;
}

interface ActiveInvestmentsResponse {
  investments?: ActiveInvestment[];
}

interface InvestmentHistoryResponse {
  success?: boolean;
  message?: string;
  investments?: InvestmentHistoryItem[];
}

const { width } = Dimensions.get('window');

const InvestScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const [investmentHistory, setInvestmentHistory] = useState<InvestmentHistoryItem[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const columnWidths = {
    planType: 120,
    amount: 100,
    ended: 120,
    status: 80,
  };

  const { activeInvestments, investmentPlans, plansLoading, plansError } = useSelector(
    (state: RootState) => state.investment
  );
  const { basicUser, userDetails } = useSelector((state: RootState) => state.auth);
  const [userBalance, setUserBalance] = useState<number>(0); // Replace this with actual data from Redux or API

  useEffect(() => {
    dispatch(getPlans())
      .unwrap()
      .then((res: InvestmentPlan[]) => {
        console.log('Fetched Plans:', res);
      })
      .catch((err: Error) => {
        console.log('Error fetching plans:', err);
      });

    dispatch(fetchActiveInvestments())
      .unwrap()
      .then((res: ActiveInvestmentsResponse) => {
        console.log('Fetched Active Investments:', res);
      })
      .catch((err: Error) => {
        console.log('Error fetching investments:', err);
      });

    dispatch(fetchInvestmentsHistory())
      .unwrap()
      .then((res: InvestmentHistoryResponse) => {
        console.log('Fetched investment history:', res);
        if (res.investments) {
          setInvestmentHistory(res.investments);
        }
      })
      .catch((err: Error) => {
        console.log('Error fetching history:', err);
      });

    dispatch(fetchWalletBalance())
      .unwrap()
      .then((data) => {
        console.log("wallet data:", data.wallet.balance);
        setUserBalance(data?.wallet?.balance)
      })
      .catch((err) => {
        console.log('Error fetching Wallet:', err);
      })
    if (basicUser?._id && !userDetails) {
      dispatch(getUserDetails(basicUser._id));
    }
  }, [dispatch, basicUser, userDetails]);

  const handleSubscribe = () => {
    if (!selectedPlan || !basicUser) return;

    if (userBalance < (selectedPlan.minAmount ?? 0)) {
      Alert.alert("Insufficient balance! Please deposit funds.");
      navigation.navigate('Deposit'); // Replace 'DepositScreen' with your actual route name
      return;
    }

    const today = new Date();
    const duration = selectedPlan.durationDays ?? 0;
    const endDateObj = new Date(today);
    endDateObj.setDate(endDateObj.getDate() + duration);

    const todayDate = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD
    const endDate = endDateObj.toISOString().split('T')[0];

    const data = {
      userId: basicUser._id,
      planId: selectedPlan._id,
      amount: selectedPlan.minAmount, // get from user input or minimum
      startDate: todayDate,
      endDate: endDate, // calculated end date
      status: 'active',
    };

    dispatch(getSubscribeInvestments({ id: selectedPlan._id, data }))
      .unwrap()
      .then(res => {
        console.log('Subscription success:', res);
        Alert.alert("Success", "Investment successfully purchased");
        setShowBalanceModal(false);
        dispatch(fetchActiveInvestments());
        // Fetch investments history
        dispatch(fetchInvestmentsHistory())
          .unwrap()
          .then(history => {
            console.log('Updated investment history:', history);
            if (history.investments) {
              setInvestmentHistory(history.investments);
            }
          })
          .catch(err => {
            console.error('Failed to fetch updated investment history:', err);
          });
      })
      .catch(err => {
        console.error('Subscription failed:', err);
        Alert.alert(`Subscription failed: ${err}`);
      });
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + hp('10%')
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop: insets.top }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Choose Your Investment Plan</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Icon name='notifications' size={RFValue(20)} color='#fff' />
            </TouchableOpacity>
          </View>
          {plansLoading ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading plans...</Text>
          ) : plansError ? (
            <Text style={{ textAlign: 'center', color: 'red', marginTop: 20 }}>{plansError}</Text>
          ) : Array.isArray(investmentPlans) && investmentPlans.length > 0 ? (
            investmentPlans.map((plan: InvestmentPlan, index: number) => {
              const planNameLower = plan.name?.toLowerCase() || '';

              const planColor =
                planNameLower.includes('gold') ? '#FDBE00' :
                  planNameLower.includes('premium') ? '#9747FF' :
                    planNameLower.includes('starter') ? '#0077FF' :
                      planNameLower.includes('ultra') ? '#10B981' :
                        planNameLower.includes('super') ? '#FF8632' :
                          '#2E7D32'; // default color

              const planImage =
                planNameLower.includes('gold') ? require('../assests/InvetManGoldPlanImage.png') :
                  planNameLower.includes('premium') ? require('../assests/InvetManPremiumPlanImage.png') :
                    planNameLower.includes('ultra') ? require('../assests/InvetManPremiumPlanImage.png') :
                      planNameLower.includes('starter') ? require('../assests/investMan.png') :
                        require('../assests/investMan.png'); // default image

              return (
                <View key={plan._id || index} style={styles.card}>
                  <View style={[styles.borderBar, { backgroundColor: planColor }]} />
                  <View style={styles.content}>
                    <View style={styles.textSection}>
                      <View style={styles.titleRow}>
                        <Icon name="schedule" size={14} color={planColor} />
                        <Text style={styles.title}> {plan.name}</Text>
                      </View>
                      <Text style={styles.text}>ROI: {plan.roiPercent}%</Text>
                      <Text style={styles.text}>Min Amount: ₹{plan.minAmount}</Text>
                      <Text style={styles.text}>Duration: {plan.durationDays} Days</Text>
                      <Text style={styles.text}>Payout: {plan.autoPayout ? 'Auto' : 'Manual'}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                      <Image source={planImage} style={styles.image} resizeMode="contain" />
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: planColor }]}
                      onPress={() => {
                        console.log('Invest Now clicked:', plan);
                        setSelectedPlan(plan);
                        setShowBalanceModal(true);
                      }}
                    >
                      <Text style={styles.buttonText}>Invest Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No investment plans found.</Text>
          )}

          <Text style={styles.investmentHeaderText}>Ongoing Investments</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollContainer}
          >
            {activeInvestments?.investments?.length > 0 ? (
              activeInvestments.investments.map((investment: ActiveInvestment, index: number) => {
                const planName = investment.planId?.name || 'Unknown Plan';
                const investedAmount = investment.amount;
                const earnings = investment.earnings || 0;
                const startDate = new Date(investment.startDate || '').toLocaleDateString();
                const endDate = new Date(investment.endDate || '').toLocaleDateString();
                const progressValue = investment.progress || 0.5;

                const backgroundColor =
                  planName.toLowerCase().includes('gold') ? '#FDBE00D9' : '#0077FFD9';

                return (
                  <View
                    key={investment._id || index}
                    style={[styles.ongoingInvestmentCard, {
                      backgroundColor,
                      width: wp('55%'),
                      marginHorizontal: wp('4%'),
                      padding: wp('4%'),
                    }]}

                  >
                    <View style={styles.headerRow}>
                      <Icon name="schedule" size={14} color="#fff" />
                      <Text style={styles.planTitle}> {planName}</Text>
                    </View>

                    <Text style={styles.label}>Progress</Text>

                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={1}
                      value={progressValue}
                      minimumTrackTintColor="#fff"
                      maximumTrackTintColor="#444"
                      thumbTintColor="#fff"
                      disabled // remove if you want interactive slider
                    />

                    <Text style={styles.detail}>Invested: ₹{investedAmount}</Text>
                    <Text style={styles.detail}>Earnings: ₹{earnings}</Text>
                    <Text style={styles.detail}>Next Payout: {startDate}</Text>
                    <Text style={styles.detail}>End Date: {endDate}</Text>
                  </View>
                );
              })
            ) : (
              <View style={styles.noInvestmentTextContainer}>
                <Text style={styles.noInvestmentText}>No active investments found.</Text>
              </View>
            )}
          </ScrollView>

          <Text style={styles.investmentHeaderText}>Past  Investment</Text>
          <ScrollView
            horizontal={true}
          >
            <View style={styles.InvestmentTablecontainer}>
              <View style={styles.InvestmentTableheaderRow}>
                <Text style={[styles.InvestmentTableheaderText, { width: columnWidths.planType }]}>Plan Type</Text>
                <Text style={[styles.InvestmentTableheaderText, { width: columnWidths.amount }]}>Amount</Text>
                <Text style={[styles.InvestmentTableheaderText, { width: columnWidths.ended }]}>Ended</Text>
                <Text style={[styles.InvestmentTableheaderText, { width: columnWidths.status }]}>Status</Text>
              </View>

              {investmentHistory.length === 0 ? (
                <View style={styles.noDataRow}>
                  <Text style={styles.noDataText}>No investment history available</Text>
                </View>
              ) : (
                investmentHistory.map((item: InvestmentHistoryItem, index: number) => {
                  const planName = item.planId?.name || 'N/A';
                  const amount = `₹${item.amount}`;
                  const endDate = new Date(item.endDate || '').toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  });
                  const status = item.status
                  ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                  : '';

                  // Determine color
                  let color = '#2E7D32'; // default green
                  if (planName.toLowerCase().includes('gold')) {
                    color = '#FDBE00';
                  } else if (planName.toLowerCase().includes('premium')) {
                    color = '#9747FF';
                  }
                  if (item.status === 'cancelled') {
                    color = '#D32F2F';
                  } else if (item.status === 'pending') {
                    color = '#FDBE00';
                  }

                  return (
                    <View style={styles.dataRow} key={item._id || index}>
                      <Text style={[styles.cellText, { color, width: columnWidths.planType }]}>{planName}</Text>
                      <Text style={[styles.cellText, { color, width: columnWidths.amount }]}>{amount}</Text>
                      <Text style={[styles.cellText, { color, width: columnWidths.ended }]}>{endDate}</Text>
                      <Text style={[styles.cellText, { color, width: columnWidths.status }]}>{status}</Text>
                    </View>
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      {showBalanceModal && selectedPlan && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalBalanceContainer}>
              <Text style={styles.modalTitle}>Your Balance:</Text>
              <Text style={styles.modalBalance}>${userBalance}</Text>
            </View>
            <View style={{ marginLeft: 30, marginBottom: 10 }}>
              <Text style={styles.modalSubtitle}>Plan Name: {selectedPlan.name}</Text>
              <Text style={styles.modalDetail}>ROI: {selectedPlan.roiPercent}%</Text>
              <Text style={styles.modalDetail}>Min Amount: ₹{selectedPlan.minAmount}</Text>
              <Text style={styles.modalDetail}>Duration: {selectedPlan.durationDays} Days</Text>
            </View>

            <TouchableOpacity
              style={styles.modalInvestButton}
              onPress={handleSubscribe}>
              <Text style={styles.modalInvestButtonText}>Invest Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancleButton} onPress={() => setShowBalanceModal(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}


    </SafeAreaView>
  )
}

export default InvestScreen

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#34A853',
    width: '100%',
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },
  headerText: {
    color: '#fff',
    fontSize: RFValue(20),
    fontWeight: '500'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'),
    marginVertical: hp('2%'),
    marginHorizontal: wp('6%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'relative',
  },
  borderBar: {
    width: wp('1.5%'),
    borderTopLeftRadius: wp('2.5%'),
    borderBottomLeftRadius: wp('2.5%'),
    position: 'absolute',
    height: '100%',
    left: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: hp('1.5%'),
  },
  textSection: {
    flex: 1,
    marginLeft: wp('6%')
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  title: {
    fontSize: RFValue(14),
    fontWeight: '500',
    color: '#000',
  },
  text: {
    fontSize: RFValue(10),
    color: '#444',
    marginBottom: hp('0.5%'),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginBottom: hp('1%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('1.5%'),
    width: wp('80%'),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: RFValue(14),
  },
  imageContainer: {
    marginRight: wp('5%')
  },
  image: {
    width: wp('25%'),
    height: hp('12%'),
    resizeMode: 'contain',
  },
  investmentHeaderText: {
    marginVertical: hp('2%'),
    marginHorizontal: wp('4%'),
    fontSize: RFValue(20),
    fontWeight: '500'
  },
  horizontalScrollContainer: {
    marginBottom: hp('1%'),
  },
  ongoingInvestmentCard: {
    borderRadius: wp('1.5%'),
    shadowRadius: 4,
    elevation: 5,
    shadowColor: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.75%'),
  },
  planTitle: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  label: {
    color: '#fff',
    fontSize: RFValue(10),
    fontWeight: '400'
  },
  slider: {
    width: '100%',
    height: hp('2%'),
    marginVertical: hp('0.75%'),
  },
  detail: {
    color: '#fff',
    fontSize: RFValue(13),
    marginBottom: hp('0.5%'),
  },
  noInvestmentTextContainer: {
    marginHorizontal: wp('17%'),
    marginVertical: hp('7%')
  },
  noInvestmentText: {
    fontSize: RFValue(20),
    fontWeight: 'bold'
  },
  InvestmentTablecontainer: {
    borderRadius: wp('1%'),
    backgroundColor: '#fff',
    marginHorizontal: wp('5%'),
    marginVertical: hp('1.5%'),
    elevation: 3,
  },
  InvestmentTableheaderRow: {
    flexDirection: 'row',
    backgroundColor: '#34A853',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2.5%'),
    borderTopLeftRadius: wp('1.5%'),
    borderTopRightRadius: wp('1.5%'),
  },
  InvestmentTableheaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'left',
    fontSize: RFValue(12),
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2.5%'),
  },
  cellText: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: RFValue(12),
  },
  noDataRow: {
    paddingVertical: hp('2.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noDataText: {
    fontSize: RFValue(16),
    color: '#888',
    fontStyle: 'italic',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'), // ~10px on standard devices
    padding: wp('5%'), // ~20px on standard devices
    width: wp('80%'), // 80% of screen width
    height: hp('40%'), // 40% of screen height
    alignItems: 'flex-start',
    elevation: 5,
    justifyContent: 'center'
  },
  modalBalanceContainer: {
    flexDirection: 'row',
    gap: wp('1.25%'),
    marginBottom: hp('1.25%'),
    marginLeft: wp('5%'),
    justifyContent: 'center',
    alignContent: 'center'
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginBottom: hp('1.25%'),
  },
  modalBalance: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: '#34A853',
  },
  modalSubtitle: {
    fontSize: RFValue(16),
    marginBottom: hp('1.25%'),
  },
  modalInvestButton: {
    backgroundColor: '#34A853',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('1.5%'),
    width: wp('60%'),
    marginBottom: hp('1.25%'),
    marginTop: hp('2.5%'),
    alignSelf: 'center'
  },
  modalCancleButton: {
    marginTop: hp('1.25%'),
    alignSelf: 'center'
  },
  modalInvestButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '600',
  },
  modalCancelText: {
    color: '#D32F2F',
    fontSize: RFValue(16),
    fontWeight: '500',
  },
  modalDetail: {
    fontSize: RFValue(14),
    color: '#000',
    marginBottom: hp('0.75%'),
  },
})
