import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from '../adminTemplateScreens/DashBoardScreen';
import UsersScreen from '../adminTemplateScreens/UsersScreen';
import InvestmentsScreen from '../adminTemplateScreens/InvestmentsScreen';
import SpinLogsScreen from '../adminTemplateScreens/SpinLogsScreen';
import DepositsScreen from '../adminTemplateScreens/DepositsScreen';
import WithdrawalsScreen from '../adminTemplateScreens/WithdrawalsScreen';
import AdminSettingsScreen from '../adminTemplateScreens/AdminSettingsScreen';
import PlansScreen from '../adminTemplateScreens/PlansScreen';
import UserViewScreen from '../adminTemplateScreens/UserViewScreen';
import WithdrawApprovals from '../adminTemplateScreens/WithdrawApprovals';
import AddNewInvestments from '../adminTemplateScreens/AddNewInvestments';
import UpdatePlan from '../adminTemplateScreens/UpdatePlan';


const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={DashBoardScreen} />
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="Investments" component={InvestmentsScreen} />
            <Stack.Screen name="SpinLogs" component={SpinLogsScreen} />
            <Stack.Screen name="Deposits" component={DepositsScreen} />
            <Stack.Screen name="Withdrawals" component={WithdrawalsScreen} />
            <Stack.Screen name="Settings" component={AdminSettingsScreen} />
            <Stack.Screen name="PlansScreen" component={PlansScreen} />
            <Stack.Screen name="UserView" component={UserViewScreen} />
            <Stack.Screen name="WithdrawApprovals" component={WithdrawApprovals} />
            <Stack.Screen name="AddNewInvestments" component={AddNewInvestments} />
            <Stack.Screen name="UpdatePlan" component={UpdatePlan} />
        </Stack.Navigator>
    );
};

export default AdminStackNavigator;
