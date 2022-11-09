import { StyleSheet } from "react-native";
import { Accelerometer, DeviceMotion } from "expo-sensors";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [screenCenter, setScreenCenter] = useState({ x: 0, y: 0 });
  const [screenBounds, setScreenBounds] = useState({ x: 0, y: 0 });

  const BALL_SIZE = 30;
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

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener((acc) => setData(acc)));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const measureBallPosition = () => {
    const horizontalScreenMax = screenBounds.x - BALL_SIZE;
    const verticalScreenMax = screenBounds.y - BALL_SIZE;

    setBallPosition({
      x: Math.min(horizontalScreenMax, Math.max(0, ballPosition.x + x * 100)),
      y: Math.min(verticalScreenMax, Math.max(0, ballPosition.y - y * 100)),
    });
  };

  useEffect(() => {
    measureBallPosition();
  }, [x, y, z]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const ballLeft = ballPosition.x;
  const topPos = ballPosition.y;

  return (
    <View style={styles.container}>
      <View
        onLayout={(layout) => getCenterOfScreen(layout)}
        style={{ flex: 1, width: "80%", height: "80%", borderWidth: 1 }}
      >
        <Text>Accelerometer:</Text>
        <Text>x:{Math.round(x)}</Text>
        <Text>y:{Math.round(y)}</Text>
        <Text>z:{Math.round(z)}</Text>
        <View
          style={[
            styles.ball,
            {
              width: BALL_SIZE,
              height: BALL_SIZE,
              borderRadius: BALL_SIZE / 2,
              position: "absolute",
              left: ballLeft,
              top: topPos,
            },
          ]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ball: {
    backgroundColor: "red",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
