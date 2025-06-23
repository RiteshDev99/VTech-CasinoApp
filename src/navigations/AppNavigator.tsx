import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './MainStackNavigator';
import store, { AppDispatch } from '../store/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { loadUserFromStorage } from '../store/features/auth/authThunk';
import AdminStackNavigator from './AdminStackNavigator';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Load user on startup
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // Grab user from Redux store
  const user = useSelector((state:any) => state.auth.user);
  const role = user?.role;

  return (
    <NavigationContainer>
      {role === 'admin' ? <AdminStackNavigator /> : <MainStackNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
