import React, { useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchWithdrawals } from '../store/features/adminWithdrawals/adminWithdrawalsThunk'

const columnWidths = {
  REQId: 120,
  userId: 80,
  amount: 100,
  RequestTime: 120,
  status: 100,
  actions: 120,  // adjusted to fit both Approve and Reject
}

const WithdrawalsScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { withdrawals, loading, error } = useSelector(
    (state: RootState) => state.withdrawals
  )
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    if (token) {
      dispatch(fetchWithdrawals())
        .unwrap()
        .then((data) => {
          console.log('fetchWithdrawals successful')
        })
        .catch((err) => console.error('fetchWithdrawals failed:', err))
    } else {
      console.log('No token available yet, skipping fetch')
    }
  }, [dispatch, token])

  const handleApprove = (id: string) => {
    console.log('Approve clicked for ID:', id)

  }

  const handleReject = (id: string) => {
    console.log('Reject clicked for ID:', id)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart name='Withdrawals' paddingBottom={20} />
        <View style={styles.container}>
          {/* Loading indicator */}
          {loading && (
            <View style={styles.centered}>
              <ActivityIndicator size='large' color='#4CAF50' />
              <Text>Loading withdrawals...</Text>
            </View>
          )}

          {/* Error message */}
          {error && !loading && (
            <View style={styles.centered}>
              <Text style={{ color: 'red' }}>Error: {error}</Text>
            </View>
          )}

          {/* Withdrawals Table */}
          {!loading && !error && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.HorizentalScrollContainer}
            >
              <View style={styles.TableContainer}>
                <View style={[styles.row, styles.headerRow]}>
                  <Text style={[styles.headerCell, { width: columnWidths.REQId }]}>Request ID</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Amount</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.RequestTime }]}>Request Time</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
                </View>

                {withdrawals.length > 0 ? (
                  withdrawals.map((item, index) => (
                    <View style={styles.row} key={item._id || index}>
                      <Text style={[styles.cell, { width: columnWidths.REQId }]}>{item._id}</Text>
                      <Text style={[styles.cell, { width: columnWidths.userId }]}>
                        {item.userId?.username || item.userId?._id || 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.amount }]}>
                        Rs.{item.amount}
                      </Text>
                      <Text
                        style={[
                          styles.cell,
                          { width: columnWidths.RequestTime, color: 'blue', textDecorationLine: 'underline' },
                        ]}
                      >
                        {new Date(item.createdAt).toLocaleString()}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.status, color: '#E5A400' }]}>
                        {item.status}
                      </Text>
                      <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
                        <Text
                          style={[styles.link, { color: 'green' }]}
                          onPress={() => handleApprove(item._id)}
                        >
                          Approve
                        </Text>
                        <Text
                          style={[styles.reject]}
                          onPress={() => handleReject(item._id)}
                        >
                          Reject
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={{ padding: 10, textAlign: 'center' }}>No withdrawals found.</Text>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default WithdrawalsScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F3F3F3',
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
  centered: {
    alignItems: 'center',
    marginVertical: 20,
  },
})
