import { View, Text, Easing } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { BALL_SIZE } from "../TabTwoScreen";

export default function PlayerItem({ item, ballLocation, screenBounds }) {
  console.log(ballLocation, screenBounds);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

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
