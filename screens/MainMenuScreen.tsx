import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SoccerBall from "../components/SoccerBall";
import { Text, View, Button } from "../components/Themed";
import Colors from "../constants/Colors";
import { RootStackScreenProps, RootTabScreenProps } from "../types";

export default function MainMenuScreen({
  navigation,
}: RootStackScreenProps<"MainMenu">) {
  const [isSoccerBallAnimated, setSoccerBallAnimated] = useState(false);
  const [isImageTrophy, setImageAsTrophy] = useState(false);

  const buttonsOpacity = useSharedValue(1);
  const boardOpacity = useSharedValue(0);
  const buttonsOpacityStyle = useAnimatedStyle(() => {
    return { opacity: buttonsOpacity.value };
  });

  const boardOpacityStyle = useAnimatedStyle(() => {
    return { opacity: boardOpacity.value };
  });

  const goToGame = () => {
    setSoccerBallAnimated(true);
    buttonsOpacity.value = withTiming(0, { duration: 2500 });
    setTimeout(() => {
      navigation.navigate("Game");
    }, 4500);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSoccerBallAnimated(false);
      boardOpacity.value = withTiming(0, { duration: 2000 });
      buttonsOpacity.value = withTiming(1, { duration: 2000 });
    });

    return unsubscribe;
  }, [navigation]);

  const goToScoreboard = () => {
    setImageAsTrophy(true);
    boardOpacity.value = withTiming(0.9, { duration: 2000 });
    buttonsOpacity.value = withTiming(0, { duration: 2500 });
  };

  const goBackToMenu = () => {
    setImageAsTrophy(false);
    boardOpacity.value = withTiming(0, { duration: 2000 });
    buttonsOpacity.value = withTiming(1, { duration: 2500 });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SoccerBall
        isAnimated={isSoccerBallAnimated}
        showTrophy={isImageTrophy}
      />
      <Animated.View style={[styles.buttonsContainer, buttonsOpacityStyle]}>
        <Button onPress={goToGame}>
          <Text style={styles.title}>START GAME!</Text>
        </Button>
        <Button onPress={goToScoreboard}>
          <Text style={styles.title}>SCOREBOARD</Text>
        </Button>
      </Animated.View>
      <Animated.View
        style={[styles.board, boardOpacityStyle]}
        pointerEvents={isImageTrophy ? "auto" : "none"}
      >
        <Text style={styles.result}>You 5 - 3 Opponent</Text>
        <Text style={styles.result}>You 2 - 3 Opponent</Text>
        <Text style={styles.result}>You 1 - 3 Opponent</Text>
        <Text style={styles.result}>You 2 - 0 Opponent</Text>
        <Text style={styles.result}>You 1 - 3 Opponent</Text>
        <Text style={styles.result}>You 4 - 0 Opponent</Text>
        <Button
          style={{ position: "absolute", bottom: 12 }}
          onPress={goBackToMenu}
        >
          <Text style={styles.title}>BACK TO MENU</Text>
        </Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  result: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  board: {
    backgroundColor: Colors.light.boardBackground,
    position: "absolute",
    top: 50,
    bottom: 50,
    opacity: 0.7,
    left: 12,
    right: 12,
    paddingTop: 50,
    alignItems: "center",
  },
});
