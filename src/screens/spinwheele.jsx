import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";
import { RFValue } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import { getSpinLogs } from "../store/features/adminSpinLogs/adminSpinLogsApi";
import { playSpinAPI } from "../store/features/spin/spinApi";
import { fetchPrizeList } from "../store/features/spin/spinThunk"; 


const { width } = Dimensions.get("window");
const wheelSize = width * 0.8;
const numberOfSegments = 12;
const angleBySegment = 360 / numberOfSegments;
const oneTurn = 360;

const colors = ["#ffbf80", "#661a00"];

function calculateArc(startAngle, endAngle) {
  const r = wheelSize / 2;
  const startRadians = (Math.PI / 180) * startAngle;
  const endRadians = (Math.PI / 180) * endAngle;

  const x1 = r + r * Math.cos(startRadians);
  const y1 = r + r * Math.sin(startRadians);
  const x2 = r + r * Math.cos(endRadians);
  const y2 = r + r * Math.sin(endRadians);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return (
    `M${r},${r} L${x1},${y1} ` + `A${r},${r} 0 ${largeArcFlag} 1 ${x2},${y2} Z`
  );
}

export default function FortuneWheel() {
  const [winner, setWinner] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const wheelRotation = useRef(0);
  const { height, width } = Dimensions.get('window');
  const dispatch = useDispatch();
  const {
    lastSpinResult,
    remainingSpins,
    walletBalance,
    loading,
    error,
    prizes = [],
  } = useSelector((state) => state.spin || {});


  useEffect(()=>{
    dispatch(fetchPrizeList())
  },[])
  


  

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner("");
    setModalVisible(false);
    const randomIndex = Math.floor(Math.random() * numberOfSegments);

    // Subtract 90 deg to align the winner at the top (12 o'clock)
    const rotateTo =
      360 * 6 +
      (360 - (randomIndex * angleBySegment + angleBySegment / 2) - 90);

    Animated.timing(animatedValue, {
      toValue: rotateTo,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      wheelRotation.current = rotateTo % oneTurn;
      setIsSpinning(false);
      setWinner(prizes[randomIndex]);
      animatedValue.setValue(wheelRotation.current);
      setTimeout(() => setModalVisible(true), 500);
    });
  };

  const interpolatedRotate = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  // Knob size and style
  const knobSize = 44;
  const center = wheelSize / 2;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assests/spinPageBGImage.png')}
        style={styles.BGImage}
        resizeMode="cover"
      >
        <View style={styles.overlayContainer}>
          {/* Title */}
          <View style={styles.mainContainer}>
            <Image
              source={require('../assests/spinPageVectorImage.png')}
              style={[styles.vectorImage, { right: width * 0.55, bottom: height * 0.08 }]}
            />
            <View style={[styles.contentTextContainer, { bottom: height * 0.1 }]}>
              <Text style={styles.FortuneText}>Fortune Awaits{'\n'}<Text> You!</Text></Text>
              <Text style={styles.spinContentText}>Spin the Wheel and Score Big Today!</Text>
            </View>
            <Image
              source={require('../assests/spinPageRightSideVectorImage.png')}
              style={[styles.vectorImage, { top: height * 0.02, right: width * -0.3, height: height * 0.2, width: width * 0.5 }]}
            />
          </View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* Golden Border */}
            <Svg
              width={wheelSize + 18}
              height={wheelSize + 18}
              style={{ position: "absolute" }}
            >
              <Circle
                cx={(wheelSize + 18) / 2}
                cy={(wheelSize + 18) / 2}
                r={wheelSize / 2 + 6}
                fill="none"
                stroke="#FFD700"
                strokeWidth={6}
              />
            </Svg>

            {/* Fortune Wheel */}
            <Animated.View style={{ transform: [{ rotate: interpolatedRotate }] }}>
              <Svg
                width={wheelSize}
                height={wheelSize}
                viewBox={`0 0 ${wheelSize} ${wheelSize}`}
              >
                <G>
                  {prizes.map((prize, i) => {
                    const startAngle = i * angleBySegment;
                    const endAngle = (i + 1) * angleBySegment;
                    const path = calculateArc(startAngle, endAngle);

                    // Text position
                    const r = (wheelSize / 2) * 0.75;
                    const midAngle = startAngle + angleBySegment / 2;
                    const x =
                      wheelSize / 2 + r * Math.cos((Math.PI / 180) * midAngle);
                    const y =
                      wheelSize / 2 + r * Math.sin((Math.PI / 180) * midAngle);
                    const circleX =
                      wheelSize + r * Math.cos((Math.PI / 180) * midAngle);
                    const circleY =
                      wheelSize + r * Math.sin((Math.PI / 180) * midAngle);

                    return (
                      <G key={`arc-${i}`}>
                        <Path d={path} fill={colors[i % colors.length]} />
                        {/* <Circle
                          // d={path}
                          x={x}
                          y={y}
                          cx={(wheelSize) / 50}
                          cy={(wheelSize) / 40}
                          r={wheelSize / 60}
                          fill="none"
                          stroke="red"
                          strokeWidth={6} /> */}
                        <SvgText
                          x={x}
                          y={y}
                          fill="#fff"
                          fontSize="14"
                          fontWeight="bold"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          transform={`rotate(${midAngle}, ${x}, ${y})`}
                        >
                          {prize}
                        </SvgText>
                      </G>
                    );
                  })}
                </G>
              </Svg>
            </Animated.View>

            {/* Knob at the center, triangle pointing upward */}
            <View style={styles.knobContainer}>
              <View style={styles.knobInside}>
                <Image source={require("../assests/images/knob.png")} style={styles.knobPointer} />
              </View>
            </View>
          </View>

          {/* Spin Button */}
          <TouchableOpacity
            style={[styles.button, isSpinning && { backgroundColor: "#999" }]}
            onPress={spinWheel}
            disabled={isSpinning}
          >
            <Text style={styles.buttonText}>
              {isSpinning ? "Spinning..." : "Spin Now"}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "white", margin: 15 }}>
            Daily 3 Spins Free More Spins Via Referal
          </Text>
        </View>
      </ImageBackground>

      {/* Modal for Winner */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#FFD700",
                marginBottom: 12,
              }}
            >
              Congratulations!
            </Text>
            <Text style={{ fontSize: 20, color: "#333", marginBottom: 16 }}>
              You Won
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "#27ae60",
                marginBottom: 16,
              }}
            >
              {winner}
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#27ae60", paddingHorizontal: 40 },
              ]}
              onPress={() => {
                setModalVisible(false);
                spinWheel();
              }}
              disabled={isSpinning}
            >
              <Text style={styles.buttonText}>Spin Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 16 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#555", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  BGImage: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  mainContainer: {
    position: 'relative'
  },
  vectorImage: {
    resizeMode: 'contain',
    position: 'absolute'
  },
  contentTextContainer: {},
  FortuneText: {
    fontSize: RFValue(36),
    fontWeight: 700,
    color: '#ffff',
    textAlign: 'center'
  },
  spinContentText: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: RFValue(16)
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  knobContainer: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  knobInside: {
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: "rgb(172, 55, 16)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  knobPointer: {
    position: "absolute",
    top: -8,
    width: 25,
    height: 30,
    borderRadius: 30,
    // backgroundColor: "rgb(204, 157, 46)",
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 4,
  },
  button: {
    marginTop: 40,
    backgroundColor: "green",
    paddingHorizontal: 120,
    paddingVertical: 14,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(10,10,10,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 24,
    alignItems: "center",
    minWidth: 300,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
