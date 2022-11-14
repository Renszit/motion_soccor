import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import PlayerItem from "./PlayerItem";

export default function RandomizedPlayers({ ballLocation, screenBounds }) {
  const AMOUNTOFPLAYERS = 7;
  const [players, setPlayers] = React.useState([]);
  const getPlayerArray = () => {
    const playerArray = [];
    for (let i = 0; i < AMOUNTOFPLAYERS; i++) {
      playerArray.push(Math.floor(Math.random() * 11));
    }
    setPlayers(playerArray);
  };

  useEffect(() => {
    getPlayerArray();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        flex: 1,
      }}
    >
      {players.map((player) => {
        return (
          <PlayerItem
            screenBounds={screenBounds}
            ballLocation={ballLocation}
            item={player}
          />
        );
      })}
    </View>
  );
}
