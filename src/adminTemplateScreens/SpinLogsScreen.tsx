import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpinLogs } from '../store/features/adminSpinLogs/adminSpinLogsThunk'; // Adjust the path as needed
import { AppDispatch, RootState } from '../store/store';

const columnWidths = {
  date: 120,
  userId: 120,
  result: 120,
  amount: 140,
};

const SpinLogsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { spins, loading, error } = useSelector((state: RootState) => state.adminSpinLogs);

  useEffect(() => {
    dispatch(fetchSpinLogs());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart name="Spin Logs" paddingBottom={20} />
        <View style={styles.container}>
          {loading && (
            <ActivityIndicator size="large" color="#4CAF50" style={{ marginVertical: 20 }} />
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
                  <Text style={[styles.headerCell, { width: columnWidths.date }]}>Date</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.result }]}>Result Value</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Spin Type</Text>
                </View>
                {spins.length > 0 ? (
                  spins.map((log) => (
                    <View style={styles.row} key={log._id}>
                      <Text style={[styles.cell, { width: columnWidths.date }]}>
                        {new Date(log.createdAt).toLocaleDateString()}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.userId }]}>
                        {log.userId?.username || 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.result }]}>
                        {log.resultValue}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.amount }]}>
                        {log.type}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.row}>
                    <Text style={styles.cell}>No spin logs available.</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpinLogsScreen;

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
});
