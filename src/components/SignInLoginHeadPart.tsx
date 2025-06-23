import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/MainStackNavigator';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SignInLoginHeadPart({ name }:any) {
    const { height, width } = Dimensions.get('window');
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <View style={styles.imageRow}>
                    <Image
                        style={[styles.image, {
                            position: 'absolute',
                            top: RFPercentage(-3),
                            left: RFPercentage(1)
                        }]}
                        source={require("../assests/leftCoins.png")}
                    />

                    <Image
                        style={[styles.imageRight, {
                            position: 'absolute',
                            top: RFPercentage(-3.5),
                            right: RFPercentage(-3.5)
                        }]}
                        source={require("../assests/rightCoins.png")}
                    />
                </View>
                <View style={[styles.loginAndCreateAccountContainer, { top: RFPercentage(11) }]}>
                    <View style={styles.loginArrowBackContain}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon style={styles.icon} name='arrow-back' size={RFValue(22)} color="#000000" />
                        </TouchableOpacity>
                        <Text style={styles.loginText}>{name}</Text>
                    </View>
                    {name !== "Sign Up" && (
                        <View style={styles.loginArrowBackContain}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUp')}
                                style={styles.createAccountButton}
                            >
                                <Text style={styles.createNewText}>Create New Account</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: RFPercentage(35),  // 35% of screen height
        backgroundColor: '#34A853',
        position: 'relative',
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: RFPercentage(3),
        position: 'absolute',
        top: 0,
    },
    image: {
        width: RFPercentage(25),
        height: RFPercentage(30),
        resizeMode: 'contain',
        position: 'absolute', // add this!
    },
    imageRight: {
        width: RFPercentage(40),
        height: RFPercentage(30),
        resizeMode: 'contain',
        position: 'absolute', // add this!
    },
    loginAndCreateAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: "100%",
        paddingHorizontal: RFPercentage(3)
    },
    loginArrowBackContain: {
        flexDirection: "row",
        alignItems: "center",
        gap: RFPercentage(1.2)
    },
    icon: {
        fontSize: RFValue(22),
        color: "#FFFFFF"
    },
    loginText: {
        fontSize: RFValue(20),
        fontWeight: '400',
        color: "#FFFFFF"
    },
    createAccountButton: {
        alignItems: 'center',
        backgroundColor: "#FF8800",
        paddingVertical: RFPercentage(0.7),
        paddingHorizontal: RFPercentage(1.5),
        borderRadius: RFPercentage(1),
        elevation: 6,
    },
    createNewText: {
        color: "#FFFFFF",
        fontSize: RFValue(10),
    }
});
