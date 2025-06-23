import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../store/features/adminUsers/adminUsersThunk';
import { AppDispatch, RootState } from '../store/store';
import { getUserDetails } from '../store/features/auth/authThunk';
import { useNavigation } from '@react-navigation/native';

const UsersScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { users, loading, error } = useSelector((state: RootState) => state.adminAllUser);
  const { basicUser, userDetails } = useSelector((state: RootState) => state.auth);

  // Define responsive column widths
  const columnWidths = {
    userId: wp(25),
    name: wp(25),
    email: wp(35),
    balance: wp(25),
    status: wp(25),
    actions: wp(30),
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsers())
        .unwrap()
        .then((data) => console.log('Fetched users successfully'))
        .catch((err) => console.error('Failed to fetch users:', err));
    }

    if (basicUser?._id && !userDetails) {
      dispatch(getUserDetails(basicUser._id));
    }
  }, [dispatch, token, userDetails, basicUser]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart name='Users' paddingBottom={hp(2)} />
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
            >
              <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={[styles.row, styles.headerRow]}>
                  <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.name }]}>Name</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.email }]}>E-Mail</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.balance }]}>Balance</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
                </View>

                {/* Table Rows */}
                {users.map((user, index) => (
                  <View style={styles.row} key={user._id || index}>
                    <Text style={[styles.cell, { width: columnWidths.userId }]} numberOfLines={1}>
                      {user.username}
                    </Text>
                    <Text style={[styles.cell, { width: columnWidths.name }]} numberOfLines={1}>
                      {user.name}
                    </Text>
                    <Text style={[styles.cell, { width: columnWidths.email }]} numberOfLines={1}>
                      {user.email}
                    </Text>
                    <Text style={[styles.cell, { width: columnWidths.balance }]} numberOfLines={1}>
                      {userDetails?._id === user._id ? userDetails.wallet?.balance ?? 'N/A' : 'N/A'}
                    </Text>
                    <Text style={[styles.cell, { width: columnWidths.status }]} numberOfLines={1}>
                      {user.status}
                    </Text>
                    <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('UserView', { user })}
                        style={styles.actionButton}
                      >
                        <Text style={styles.viewText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.suspendText}>Suspend</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.rejectText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(2.5),
    backgroundColor: "#F3F3F3",
    margin: wp(2.5),
    borderRadius: wp(1.5),
  },
  horizontalScrollContainer: {
    paddingBottom: hp(1),
  },
  tableContainer: {
    minWidth: wp(100) - wp(5), // Account for margins
  },
  row: {
    flexDirection: 'row',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    minHeight: hp(6),
  },
  headerRow: {
    backgroundColor: '#4CAF50',
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: wp(2),
    fontSize: RFValue(12),
  },
  cell: {
    paddingHorizontal: wp(2),
    fontSize: RFValue(11),
  },
  actionButton: {
    marginRight: wp(2),
  },
  viewText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: RFValue(11),
  },
  suspendText: {
    color: '#E5A400',
    textDecorationLine: 'underline',
    fontSize: RFValue(11),
  },
  rejectText: {
    color: 'red',
    textDecorationLine: 'underline',
    fontSize: RFValue(11),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: RFValue(12),
    marginVertical: hp(1),
  },
});

export default UsersScreen;