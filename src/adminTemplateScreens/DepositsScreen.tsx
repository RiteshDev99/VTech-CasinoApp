import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchDeposits } from '../store/features/adminDeposits/adminDepositsThunk';

const columnWidths = {
  txnId: 120,
  userId: 100, // increased width to accommodate name
  amount: 100,
  screenshot: 120,
  status: 100,
  actions: 140,
};

const DepositsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { deposits, loading, error } = useSelector(
    (state: RootState) => state.deposits
  );
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchDeposits())
        .unwrap()
        .then((data) => {
          console.log('fetchDeposits successful');
          console.log('Fetched data:', data);
        })
        .catch((err) => console.error('fetch failed:', err));
    } else {
      console.log('No token available yet, skipping fetch');
    }
  }, [dispatch, token]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart name="Deposits" paddingBottom={20} />

        {loading && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
        )}
        {error && (
          <Text
            style={{ textAlign: 'center', marginTop: 20, color: 'red' }}
          >
            {error}
          </Text>
        )}

        {!loading && !error && Array.isArray(deposits) && deposits.length > 0 && (
          <View style={styles.container}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.HorizentalScrollContainer}
            >
              <View style={styles.TableContainer}>
                <View style={[styles.row, styles.headerRow]}>
                  <Text
                    style={[styles.headerCell, { width: columnWidths.txnId }]}
                  >
                    Txn ID
                  </Text>
                  <Text
                    style={[styles.headerCell, { width: columnWidths.userId }]}
                  >
                    User Name
                  </Text>
                  <Text
                    style={[styles.headerCell, { width: columnWidths.amount }]}
                  >
                    Amount
                  </Text>
                  <Text
                    style={[
                      styles.headerCell,
                      { width: columnWidths.screenshot },
                    ]}
                  >
                    Screenshot Link
                  </Text>
                  <Text
                    style={[styles.headerCell, { width: columnWidths.status }]}
                  >
                    Status
                  </Text>
                  <Text
                    style={[styles.headerCell, { width: columnWidths.actions }]}
                  >
                    Actions
                  </Text>
                </View>

                {(deposits ?? []).map((item, index) => (
                  <View style={styles.row} key={index}>
                    <Text
                      style={[styles.cell, { width: columnWidths.txnId }]}
                    >
                      {item._id || 'N/A'}
                    </Text>
                    <Text
                      style={[styles.cell, { width: columnWidths.userId }]}
                    >
                      {item.userId?.name || 'N/A'}
                    </Text>
                    <Text
                      style={[styles.cell, { width: columnWidths.amount }]}
                    >
                      {item.amount || 'N/A'}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        {
                          width: columnWidths.screenshot,
                          color: 'blue',
                          textDecorationLine: 'underline',
                        },
                      ]}
                    >
                      {item.screenshot ? 'View' : 'N/A'}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        { width: columnWidths.status, color: '#E5A400' },
                      ]}
                    >
                      {item.status || 'Pending'}
                    </Text>
                    <View
                      style={[
                        styles.cell,
                        { width: columnWidths.actions, flexDirection: 'row' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.link,
                          { color: 'green', textDecorationLine: 'underline' },
                        ]}
                      >
                        Approve
                      </Text>
                      <Text
                        style={[styles.reject, { marginLeft: 10 }]}
                      >
                        Reject
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {!loading && !error && Array.isArray(deposits) && deposits.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No deposits found.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DepositsScreen;

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
});
