import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart'

const AdminSettingsScreen = () => {
  return (
    <View>
      <AdminTemplateHeaderPart name='SettingsScreen' paddingBottom={20} />
      <Text>SettingsScreen</Text>
    </View>
  )
}

export default AdminSettingsScreen

const styles = StyleSheet.create({})