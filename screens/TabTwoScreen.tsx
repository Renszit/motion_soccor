import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { SoccerField } from "./soccerfield/FieldBackground";
import Goal from "./soccerfield/Goal";
import RandomizedPlayers from "./soccerfield/RandomizedPlayers";
import SoccerFieldImage from "../assets/images/field.png";
import SoccerBallImage from "../assets/images/soccer-ball-no-transparency.png";

export const BALL_SIZE = 30;

export default function TabTwoScreen() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [screenCenter, setScreenCenter] = useState({ x: 0, y: 0 });
  const [screenBounds, setScreenBounds] = useState({ x: 0, y: 0 });

  const getCenterOfScreen = (layout) => {
    setScreenBounds({
      x: layout?.nativeEvent?.layout?.width,
      y: layout?.nativeEvent?.layout?.height,
    });
    setScreenCenter({
      x: layout?.nativeEvent?.layout?.width / 2,
      y: layout?.nativeEvent?.layout?.height / 2,
    });
  };

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const config = {
    duration: 100,
    easing: Easing.ease,
  };

  const [score, setScore] = useState(0);
  const _subscribe = () => {
    setSubscription(Accelerometer.addListener((acc) => setData(acc)));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    if (score !== 0) alert("GOAL! " + score + " - 0");
  }, [score]);

  const measureBallPosition = () => {
    const horizontalScreenMax = screenBounds.x - BALL_SIZE;
    const verticalScreenMax = screenBounds.y - BALL_SIZE;

    translateX.value = withTiming(
      Math.min(
        horizontalScreenMax / 2,
        Math.max(-horizontalScreenMax / 2, translateX.value + x * 100)
      ),
      config
    );
    translateY.value = withTiming(
      Math.min(
        0 + BALL_SIZE,
        Math.max(
          -verticalScreenMax + BALL_SIZE - 10,
          translateY.value - y * 100
        )
      ),
      config
    );

    if (translateY.value < -verticalScreenMax + BALL_SIZE) {
      const goalwidth = horizontalScreenMax / 2;
      const goalHeight = 20;
      const margin = (horizontalScreenMax - goalwidth) / 2;

      if (Math.abs(translateX.value) < goalwidth / 2) {
        setScore(score + 1);
        resetGame();
      }
    }
  };

  const resetGame = () => {
    translateX.value = withTiming(0, config);
    translateY.value = withTiming(0, config);
  };

  const [initialBallLocation, setInitialBallLocation] = useState({
    x: 0,
    y: 0,
  });
  const getBallLocation = (ev) => {
    setInitialBallLocation({
      x: ev.nativeEvent.layout.x,
      y: ev.nativeEvent.layout.y,
    });
  };

  useEffect(() => {
    measureBallPosition();
  }, [x, y]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const ballX = screenBounds.x + translateX.value;
  const ballY = screenBounds.y + translateY.value;

  return (
    <View style={styles.container}>
      <View
        onLayout={(layout) => getCenterOfScreen(layout)}
        style={styles.actionArea}
      >
        <ImageBackground
          source={SoccerFieldImage}
          onLayout={(layout) => getCenterOfScreen(layout)}
          resizeMode="cover"
          style={styles.soccerField}
        >
          <Goal />
          <RandomizedPlayers
            screenBounds={screenBounds}
            ballLocation={{ x: ballX, y: ballY }}
          />

          <Animated.View
            onLayout={(e) => getBallLocation(e)}
            style={[animatedStyle]}
          >
            <Image
              source={SoccerBallImage}
              style={{ height: BALL_SIZE, width: BALL_SIZE }}
            />
          </Animated.View>
          <Goal />
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  soccerField: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    height: "100%",
    width: "100%",
  },
  actionArea: {
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    height: "90%",
    alignItems: "center",
    borderWidth: 1,
  },
});
