import { View, Text, Easing } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { BALL_SIZE } from "../TabTwoScreen";

export default function PlayerItem({ item, ballLocation, screenBounds }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [playerLocation, setPlayerLocation] = useState();
  //   console.log(playerLocation);
  const horizontalScreenMax = screenBounds.x - BALL_SIZE;
  const verticalScreenMax = screenBounds.y - BALL_SIZE;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const config = {
    duration: 1000,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      translateX.value = withTiming(Math.random() * 200 - 80, config);
      translateY.value = withTiming(Math.random() * 200 - 80, config);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkIfBallIsTouchingPlayer();
  }, [ballLocation]);

  const checkIfBallIsTouchingPlayer = () => {
    const ballX = Math.round(ballLocation.x);
    const ballY = Math.round(ballLocation.y);
    const playerX = Math.round(translateX.value);
    const playerY = Math.round(translateY.value);
  };

  const getPlayerLocation = (e) => {
    console.log("e", e.target);
    setPlayerLocation({
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y,
    });
  };

  return (
    <View
      key={item}
      style={{
        margin: 20,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        onLayout={(event) => {
          getPlayerLocation(event);
        }}
        style={[
          {
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            margin: 30,
            backgroundColor: "black",
          },
          animatedStyle,
        ]}
      >
        <Text style={{ color: "white" }}>{item}</Text>
      </Animated.View>
    </View>
  );
}
