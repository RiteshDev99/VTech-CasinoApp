import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, Alert } from 'react-native'; // ✅ Added Alert import
import React, { useState } from 'react';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { addInvestments } from '../store/features/adminInvestment/investmentsThunk';
import { useNavigation } from '@react-navigation/native';

const AddNewInvestments = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.adminInvestment);
    const navigation = useNavigation();
    const [planName, setPlanName] = useState('');
    const [roi, setRoi] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [duration, setDuration] = useState('');

    const handleSave = () => {
        console.log('Save button pressed');
        console.log('Form Data:', { planName, roi, minAmount, duration });

        // Basic validation
        if (!planName || !roi || !minAmount || !duration) {
            Alert.alert('Error', 'Please fill all the fields.');
            console.log('Validation failed: Missing fields');
            return;
        }

        // Construct request data with correct state variables
        const requestData = {
            name: planName,
            roiPercent: roi,
            minAmount: minAmount,
            durationDays: duration,
        };

        console.log('Request Data:', requestData);

        // Dispatch thunk to post data
        dispatch(addInvestments(requestData))
            .unwrap()
            .then((response) => {
                console.log('API Response:', response);
                Alert.alert('Success', 'Investment plan added successfully!');
                // Reset form fields
                setPlanName('');
                setRoi('');
                setMinAmount('');
                setDuration('');
                // Optionally navigate back
                navigation.goBack();
            })
            .catch((error) => {
                console.error('API Error:', error);
                Alert.alert('Error', error || 'Failed to add investment plan.');
            });
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <AdminTemplateHeaderPart name={'Add New Investment'} paddingBottom={20} />

                <View style={styles.formContainer}>
                    {/* Plan Name */}
                    <Text style={styles.labelText}>Plan Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Plan Name"
                        placeholderTextColor="#8F8F8F"
                        value={planName}
                        onChangeText={setPlanName}
                    />

                    {/* ROI (%) */}
                    <Text style={styles.labelText}>ROI (%)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter ROI Percentage"
                        placeholderTextColor="#8F8F8F"
                        keyboardType="numeric"
                        value={roi}
                        onChangeText={setRoi}
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
                    <Text style={styles.labelText}>Duration</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Duration (e.g., 30 days)"
                        placeholderTextColor="#8F8F8F"
                        value={duration}
                        onChangeText={setDuration}
                    />

                    {/* Save Button */}
                    <TouchableOpacity
                        style={[styles.saveButton, loading && { opacity: 0.7 }]}
                        onPress={handleSave}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Saving...' : 'Save'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddNewInvestments;

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
        paddingBottom: 20, // Prevents bottom cutoff
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
    saveButton: {
        marginTop: 20,
        backgroundColor: "#FF8800",
        width: "30%",
        borderRadius: 6,
        padding: 12,
        alignItems: 'center',
        alignSelf: 'center', // Center the button
    },
    buttonText: {
        color: '#fff',
        fontSize: RFValue(14),
        fontWeight: '500',
    },
});
