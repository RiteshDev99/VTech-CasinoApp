import React from 'react'
import { Image, useWindowDimensions, View } from 'react-native'
// import Logo from '../assests/landing.svg';

const LandingScreen = () => {
    const screen = useWindowDimensions();
    return (
        <View>

            {/* <Logo width={100} height={100} /> */}
            <Image
                style={{
                    width: "100%",
                    height: screen.height,
                }}
                source={require('../assests/landing.png')}
            />
        </View>
    )
}

export default LandingScreen;
