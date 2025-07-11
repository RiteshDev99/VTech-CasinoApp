import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Pressable,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { fetchWalletBalance } from '../store/features/wallet/walletThunk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/MainStackNavigator';

interface ImageItem {
    id: string;
    uri: any;
}

const images: ImageItem[] = [
    { id: '1', uri: require('../assests/HomepageIMageScroller1.png') },
    { id: '2', uri: require('../assests/HomepageIMageScroller2.png') },
    { id: '3', uri: require('../assests/HomepageIMageScroller3.png') },
    { id: '4', uri: require('../assests/HomepageIMageScroller4.png') },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
    const { height, width } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<ImageItem>>(null);
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch<AppDispatch>();
    const [userBalance, setUserBalance] = useState<number>(0); // Replace this with actual data from Redux or API


    const handleNavigation = (routeName: string) => {
        if (user) {
            navigation.navigate(routeName as never);
        } else {
            navigation.navigate('Login' as never);
        }
    };

    useEffect(() => {
        dispatch(fetchWalletBalance())
            .unwrap()
            .then((data) => {
                console.log("wallet data:", data.wallet.balance);
                setUserBalance(data.wallet.balance)
            })
            .catch((err) => {
                console.log('Error fetching Wallet:', err);
            })
    }, [dispatch])

    const user = useSelector((state: RootState) => state.auth.user);



    return (
        <ScrollView contentContainerStyle={[styles.scrollViewContent, { paddingBottom: insets.bottom + 100 }]}>
           <SafeAreaView>
                <View>
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>
                            <Text style={styles.subText}>Get Ready To Spin</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notificationIcon}>
                            <Icon name='notifications' size={20} color="#FF8800" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.imageMainContainer}>
                        <FlatList
                            ref={flatListRef}
                            data={images}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={Dimensions.get('window').width * 0.8 + 65}
                            snapToAlignment='start'
                            decelerationRate="fast"
                            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                                const slide = Math.round(
                                    event.nativeEvent.contentOffset.x /
                                    (Dimensions.get('window').width * 0.9 + 20)
                                );
                                setCurrentIndex(slide);
                            }}
                            scrollEventThrottle={16}
                            contentContainerStyle={{ paddingHorizontal: Dimensions.get('window').width * 0.04 }}
                            renderItem={({ item }) => (
                                <Pressable style={styles.imageContainer}>
                                    <Image source={item.uri} style={styles.image} />
                                </Pressable>
                            )}
                        />
                        <View style={styles.dotContainer}>
                            {images.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.dot,
                                        currentIndex === index && styles.activeDot
                                    ]}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.IconMainContaineer}>
                        <TouchableOpacity onPress={() => handleNavigation('Deposit')} style={styles.IconContaineer}>
                            <Icon name='upload' size={26} color='#FFFFFF' />
                            <Text style={styles.IconText}>DEPOSIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleNavigation('Withdraw') }} style={styles.IconContaineer}>
                            <Icon name='download' size={26} color='#FFFFFF' />
                            <Text style={styles.IconText}>WITHDRAW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Spin')} style={styles.IconContaineer}>
                            <Icon name='radar' size={26} color='#FFFFFF' />
                            <Text style={styles.IconText}>SPIN NOW</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.summaryCard}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>Today's Earnings</Text>
                            <Text style={[styles.value, { color: '#007BFF' }]}>₹120</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>Balance</Text>
                            <Text style={[styles.value, { color: '#fbc02d' }]}>{userBalance}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>Frozen Amount</Text>
                            <Text style={[styles.value, { color: 'red' }]}>0</Text>
                        </View>
                    </View>

                    <Text style={styles.recentTitle}>Recent Activity</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15, marginBottom: 20 }} // adds space on both sides
                    >
                        <View style={styles.recentContainer}>
                            <View style={styles.recentCard}>
                                <View style={styles.activityTextContainer}>
                                    <Text style={styles.recentText}>Deposited{"\n"}Rs.500</Text>
                                    <Text style={styles.recentTime}>2h Ago</Text>
                                </View>
                                <View style={styles.recentContainerImageContainer}>
                                    <Image
                                        source={require('../assests/homepageDepositedImage.png')}
                                        resizeMode="contain"
                                        style={styles.recentContainerImage}
                                    />
                                </View>
                            </View>

                            <View style={styles.recentCard}>
                                <View style={styles.activityTextContainer}>
                                    <Text style={styles.recentText}>Spin & Win{"\n"}Rs.100</Text>
                                    <Text style={styles.recentTime}>2h Ago</Text>
                                </View>
                                <View style={styles.recentContainerImageContainer}>
                                    <Image
                                        source={require('../assests/homepageSipnAndWinImage.png')}
                                        resizeMode="contain"
                                        style={styles.recentContainerImage}
                                    />
                                </View>
                            </View>

                            <View style={styles.recentCard}>
                                <View style={styles.activityTextContainer}>
                                    <Text style={styles.recentText}>Withdraw{"\n"}Rs.200</Text>
                                    <Text style={styles.recentTime}>3h Ago</Text>
                                </View>
                                <View style={styles.recentContainerImageContainer}>
                                    <Image
                                        source={require('../assests/homepageWithdrawImage.png')}
                                        resizeMode="contain"
                                        style={styles.recentContainerImage}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Today</Text>
                        <Text style={styles.seeAll}>See All</Text>
                    </View>

                    <View style={styles.todayCard}>
                        <View style={styles.todayRow}>
                            <Icon name='radar' size={30} color='red' />
                            <View>
                                <Text style={styles.todayLabel}>Latest Spin Reward</Text>
                                <Text>Rs.500</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.todayRow}>
                            <Icon name='attach-money' size={30} color='skyblue' />
                            <View>
                                <Text style={styles.todayLabel}>Active Investment</Text>
                                <Text>Gold Plan | 2.5% Daily | Active</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.todayRow}>
                            <Icon name='schedule' size={30} color='lightgreen' />
                            <View>
                                <Text style={styles.todayLabel}>Next Payout</Text>
                                <Text>12:45:30</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.recentTitle}>Play and Win Gift Hampers</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScrollContainer}
                    >
                        <View style={styles.card}>
                            <Image source={require('../assests/homepageBigWinImage.png')} style={styles.cardImage} />
                            <TouchableOpacity style={[styles.playButton, { top: height * 0.11, left: width * 0.13 }]}>
                                <Text style={styles.playButtonText}>Play Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../assests/homepageGirlScrollImage.png')} style={styles.cardImage} />
                            <TouchableOpacity style={[styles.playButton, { top: height * 0.11, left: width * 0.13 }]}>
                                <Text style={styles.playButtonText}>Play Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../assests/homepageLuckySpinImage.png')} style={styles.cardImage} />
                            <TouchableOpacity style={[styles.playButton, { top: height * 0.11, left: width * 0.13 }]}>
                                <Text style={styles.playButtonText}>Play Now</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    headerContent: {
        backgroundColor: "#34A853",
        padding: wp(6), // ~24px on a 400px screen
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    welcomeText: {
        color: '#fff',
        fontSize: RFValue(26),
        fontWeight: '500',
    },
    subText: {
        color: '#fff',
        fontSize: RFValue(14),
        marginTop: hp(0.5),
        fontWeight: '200',
    },
    notificationIcon: {
        backgroundColor: '#FFFFFF',
        borderRadius: wp(1.5), // ~6px on a 400px screen
        padding: wp(1), // ~4px on a 400px screen
    },
    imageMainContainer: {
        marginVertical: 20,
    },
    imageContainer: {
        marginHorizontal: 10,
        height: 180,
        width: Dimensions.get('window').width * 0.9,

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#34A853',
        width: 10,
        height: 10,
    },
    IconMainContaineer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 30,
        alignItems: 'center',
        marginBottom: 20
    },
    IconContaineer: {
        backgroundColor: '#FF8800',
        padding: 12,
        alignItems: 'center',
        borderRadius: 6,
        width: 70,
        height: 65,
        gap: 5
    },
    IconText: {
        color: '#fff',
        fontSize: RFValue(8),
        fontWeight: '400'
    },
    summaryCard: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 16,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#e0e0e0',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    seeAll: {
        color: 'green',
        fontWeight: '500',
    },
    todayCard: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 4,
    },
    todayRow: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginBottom: 12
    },
    todayLabel: {
        fontWeight: '600',
        fontSize: RFValue(14)
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginVertical: 6,
    },
    recentTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 16,
        marginTop: 30,
        marginBottom: 10
    },
    recentContainer: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
        gap: 15
    },
    recentCard: {
        width: 180,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 20
    },
    activityTextContainer: {

    },
    recentText: {
        fontSize: RFValue(14),
        fontWeight: '400',
        marginBottom: 20,
    },
    recentTime: {
        fontSize: 12,
        color: '#888',
    },
    recentContainerImageContainer: {
        width: 80,
        height: 80,
    },
    recentContainerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    horizontalScrollContainer: {},
    card: {
        marginTop: 20,
        marginRight: 15,
        marginLeft: 20,
        width: 192,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 133,
        resizeMode: 'cover',
    },
    playButton: {
        backgroundColor: '#34A853',
        paddingVertical: 10,
        width: 100,
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 6
    },
    playButtonText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 600,
    },
});
