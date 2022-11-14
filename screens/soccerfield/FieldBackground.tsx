import React from "react";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";

export function SoccerField() {
  return (
    <Svg height="684" width="452">
      <Rect opacity=".7" height="684" width="452" fill="#0b0" ry="6" />
      <G stroke="#efe" stroke-width="3" fill="none">
        <Path d="m11.22 22.62v638.8h429.6v-638.8z" />
        <Path d="m11.26 342h429.4" />
        <Circle cy="342" cx="226" r="54.8" />
        <Circle cy="342" cx="226" r="2" />
        <G id="a">
          <Path d="m9.9 30.07c4.85 0 8.82-4 8.82-8.9m162.5 100.8a54.91 54.91 0 0 0 89.6 0m76.3-99.63v99.63h-242.2l.2-99.63m98.6.20v-15.6l44.6.003v15.6m-77.9-.20v34.4h111.2v-34.4m160.5 7.7c-4.9 0-8.8-4-8.8-8.9" />
          <Circle cy="90" cx="226" r="2" />
        </G>
      </G>
    </Svg>
  );
}
