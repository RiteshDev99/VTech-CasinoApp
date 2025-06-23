import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Switch
} from 'react-native';
import React, { useState } from 'react';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateInvestment } from '../store/features/adminInvestment/investmentsThunk';

const UpdatePlan = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { plan } = route.params;
    console.log("update plan: ", plan);
    const { loading } = useSelector((state) => state.adminInvestment);
    const dispatch = useDispatch();

    const [name, setName] = useState(plan.name);
    const [roiPercent, setRoiPercent] = useState(String(plan.roiPercent));
    const [minAmount, setMinAmount] = useState(String(plan.minAmount));
    const [durationDays, setDurationDays] = useState(String(plan.durationDays));

    const handleUpdate = () => {
        if (!name || !roiPercent || !minAmount || !durationDays) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        const updatedPlan = {
            _id: plan._id,
            name,
            roiPercent: parseInt(roiPercent),
            minAmount: parseInt(minAmount),
            durationDays: parseInt(durationDays),
            autoPayout: plan.autoPayout,
        };
        console.log('Sending update:', updatedPlan);
        dispatch(updateInvestment({ id: plan._id, updateData: updatedPlan }))
            .unwrap()
            .then((response) => {
                console.log('API Response:', response);
                Alert.alert('Success', 'Investment plan updated successfully!');
                navigation.goBack();
            })
            .catch((error) => {
                console.error('API Error:', error);
                Alert.alert('Error', error || 'Failed to update investment plan.');
            });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <AdminTemplateHeaderPart name={'Update Plan'} paddingBottom={20} />

                <View style={styles.formContainer}>
                    {/* Plan Name */}
                    <Text style={styles.labelText}>Plan Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Plan Name"
                        placeholderTextColor="#8F8F8F"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* ROI (%) */}
                    <Text style={styles.labelText}>ROI (%)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter ROI Percentage"
                        placeholderTextColor="#8F8F8F"
                        keyboardType="numeric"
                        value={roiPercent}
                        onChangeText={setRoiPercent}
                    />

                    {/* Min Amount */}
                    <Text style={styles.labelText}>Min Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Minimum Amount"
                        placeholderTextColor="#8F8F8F"
                        keyboardType="numeric"
                        value={minAmount}
                        onChangeText={setMinAmount}
                    />

                    {/* Duration */}
                    <Text style={styles.labelText}>Duration (days)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Duration in Days"
                        placeholderTextColor="#8F8F8F"
                        keyboardType="numeric"
                        value={durationDays}
                        onChangeText={setDurationDays}
                    />

                    {/* Save Button */}
                    <TouchableOpacity
                        style={[styles.saveButton, loading && { opacity: 0.7 }]}
                        onPress={handleUpdate}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdatePlan;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    formContainer: {
        paddingHorizontal: 15,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        marginBottom: 16,
        width: '100%',
        color: '#000',
        fontSize: RFValue(14),
    },
    labelText: {
        marginBottom: 6,
        marginLeft: 5,
        fontSize: RFValue(14),
        color: '#8F8F8F',
        fontWeight: '500',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: "#FF8800",
        width: "30%",
        borderRadius: 6,
        padding: 12,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: RFValue(14),
        fontWeight: '500',
    },
});
