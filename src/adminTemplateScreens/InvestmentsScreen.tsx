import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvestmentsUser } from '../store/features/adminInvestment/investmentsThunk'
import moment from 'moment'; // for date formatting
import { AppDispatch } from '../store/store'
import { RootState } from '../store/store';
import { fetchAllUsers } from '../store/features/adminUsers/adminUsersThunk'


const columnWidths = {
  userId: 100,
  planName: 100,
  amount: 100,
  roi: 100,
  status: 100,
  date: 100,
}

// interface Investment {
//   _id?: string;
//   userId?: string;
//   planId?: {
//     name?: string;
//     roiPercent?: number;
//   };
//   amount?: number;
//   status?: string;
//   startDate?: string;  // or Date, depending on your data
//   endDate?: string;    // or Date
// }

const InvestmentsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { investments, loading, error } = useSelector((state: RootState) => state.adminInvestment);
  const { users } = useSelector((state: RootState) => state.adminAllUser);

  useEffect(() => {
    if (token) {
      console.log("Token found, fetching investments");
      dispatch(fetchInvestmentsUser())
        .unwrap()
        .then((data) => {
          console.log('fetchInvestmentsUser successful')
          console.log('Fetched data:', data);
        })
        .catch((err) => console.error('fetchInvestmentsUser failed:', err));
    } else {
      console.log("No token available yet, skipping fetch");
    }
    dispatch(fetchAllUsers())
      .unwrap()
      .then((data) => {
        console.log('fetchUser successful')
      })
      .catch((err) => console.error('fetchUser failed:', err));
  }, [dispatch, token]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart name='Investments' paddingBottom={20} />
        <View style={styles.container}>
          {loading && (
            <ActivityIndicator size='large' color='#4CAF50' style={{ marginTop: 20 }} />
          )}
          {error && (
            <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>
              {error}
            </Text>
          )}
          {!loading && !error && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.HorizentalScrollContainer}
            >
              <View style={styles.TableContainer}>
                <View style={[styles.row, styles.headerRow]}>
                  <Text style={[styles.headerCell, { width: columnWidths.userId }]}>
                    User ID
                  </Text>
                  <Text style={[styles.headerCell, { width: columnWidths.planName }]}>
                    Plan Name
                  </Text>
                  <Text style={[styles.headerCell, { width: columnWidths.amount }]}>
                    Amount
                  </Text>
                  <Text style={[styles.headerCell, { width: columnWidths.roi }]}>
                    R.O.I
                  </Text>
                  <Text style={[styles.headerCell, { width: columnWidths.status }]}>
                    Status
                  </Text>
                  <Text style={[styles.headerCell, { width: columnWidths.date }]}>
                    Dates
                  </Text>
                </View>

                {investments && investments.length > 0 ? (
                  investments.map((item, index) => (
                    <View style={styles.row} key={item._id || index}>
                      <Text style={[styles.cell, { width: columnWidths.userId }]}>
                        {
                          users.find(u => u._id === item.userId)?.username || 'N/A'
                        }
                      </Text>

                      <Text style={[styles.cell, { width: columnWidths.planName }]}>
                        {item.planId?.name || 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.amount }]}>
                        Rs.{item.amount ?? 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.roi }]}>
                        {item.planId?.roiPercent != null ? `${item.planId.roiPercent}%` : 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.status }]}>
                        {item.status
                          ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                          : 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.date }]}>
                        {item.startDate && item.endDate
                          ? `${moment(item.startDate).format('MM/DD/YY')} - ${moment(item.endDate).format('MM/DD/YY')}`
                          : 'N/A'}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={{ padding: 10, textAlign: 'center' }}>No investments found.</Text>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default InvestmentsScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F3F3F3",
    margin: 10,
    borderRadius: 6
  },
  HorizentalScrollContainer: {
    backgroundColor: '#fff',
  },
  TableContainer: {

  },
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
    textDecorationLine: 'underline'
  },
  reject: {
    color: 'red',
    textDecorationLine: 'underline'
  },
})
