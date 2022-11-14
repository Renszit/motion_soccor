import Svg, { G, Path } from "react-native-svg";

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { interpolatePath } from "d3-interpolate-path";
import { interpolate } from "flubber";
import AnimatedPath from "./AnimatedPath";

const SOCCER_BALL_PATH =
  "M2315 5109 c-885 -91 -1660 -630 -2050 -1424 -89 -182 -142 -324 -188 -510 -58 -232 -71 -349 -71 -615 0 -271 13 -386 74 -626 49 -192 93 -312 186 -500 324 -663 933 -1161 1647 -1349 233 -61 371 -78 637 -79 239 -1 321 6 515 45 388 78 764 253 1084 507 117 92 313 287 405 402 164 205 324 487 411 724 48 130 108 370 131 521 22 148 26 532 6 670 -85 594 -323 1076 -737 1490 -400 401 -878 643 -1445 730 -126 19 -477 28 -605 14z m567 -312 c43 -8 80 -15 82 -18 2 -2 -55 -47 -126 -99 -72 -52 -164 -119 -204 -148 l-74 -54 -200 147 c-110 81 -200 150 -200 155 0 4 46 12 103 19 56 6 116 13 132 15 58 8 411 -5 487 -17z m-787 -349 l315 -232 0 -360 0 -361 -331 -248 -331 -249 -347 118 c-190 64 -351 122 -357 128 -6 6 -61 175 -123 374 -102 332 -111 366 -98 385 32 48 185 202 276 278 112 94 263 198 375 260 78 42 284 138 298 139 5 0 150 -104 323 -232z m1335 197 c330 -141 622 -354 841 -611 l71 -84 -122 -367 c-68 -203 -125 -371 -129 -375 -6 -7 -642 -211 -683 -220 -10 -2 -156 101 -357 252 l-341 254 0 361 0 361 157 114 c401 294 478 350 480 350 1 0 38 -16 83 -35z m-2761 -1221 c60 -196 70 -239 59 -250 -38 -37 -393 -274 -396 -264 -7 21 41 228 83 356 40 123 160 394 174 394 4 0 39 -106 80 -236z m4035 -154 c44 -134 78 -274 91 -380 6 -45 5 -53 -6 -44 -8 6 -97 71 -199 144 -102 73 -189 137 -194 141 -7 6 133 450 152 484 10 17 109 -203 156 -345z m-1828 -275 c248 -185 314 -239 309 -253 -3 -9 -54 -154 -113 -322 l-107 -305 -400 -3 -401 -2 -107 331 c-60 182 -106 333 -104 335 7 8 602 454 605 454 1 0 145 -106 318 -235z m-1573 -162 l348 -118 124 -378 124 -377 -218 -323 -218 -322 -394 -2 -394 -3 -52 88 c-187 313 -306 701 -316 1026 l-2 88 315 219 c173 120 320 219 325 219 6 0 167 -53 358 -117z m3205 -153 l311 -225 -5 -60 c-30 -358 -135 -689 -317 -997 l-52 -88 -400 3 -400 2 -202 330 c-111 182 -202 334 -203 339 0 13 241 699 249 708 12 13 665 218 687 215 11 -1 161 -103 332 -227z m-1311 -1205 c111 -181 202 -336 202 -343 1 -7 -52 -179 -116 -382 l-116 -369 -86 -20 c-184 -43 -298 -55 -521 -55 -224 0 -327 11 -518 55 -75 17 -95 25 -102 43 -5 11 -60 182 -122 379 l-112 357 144 213 c79 116 181 267 227 335 l84 122 417 -2 417 -3 202 -330z m-1689 -703 c40 -129 71 -236 69 -239 -3 -2 -29 8 -59 23 -161 82 -368 230 -513 368 l-90 85 260 -2 260 -2 73 -233z m2607 151 c-101 -96 -272 -227 -385 -295 -101 -61 -200 -110 -200 -100 0 5 6 28 14 53 8 24 42 131 76 237 l61 192 262 0 262 -1 -90 -86z";

const TROPHY_PATH =
  "M2377 5104 c-189 -34 -370 -129 -512 -269 -138 -135 -226 -279 -281 -460 -26 -83 -28 -103 -28 -265 -1 -169 6 -225 41 -317 4 -10 -17 2 -48 28 l-55 47 -127 -122 c-70 -66 -128 -127 -127 -133 0 -13 687 -2958 695 -2980 2 -6 -48 -102 -111 -212 l-114 -201 0 -110 0 -110 850 0 850 0 0 110 0 110 -114 201 c-63 110 -113 206 -111 212 8 22 695 2967 695 2980 1 6 -57 67 -127 133 l-127 122 -55 -47 c-47 -40 -53 -43 -46 -21 29 92 37 140 42 259 8 193 -19 326 -99 485 -211 421 -641 641 -1091 560z m313 -298 c41 -8 104 -25 140 -40 72 -29 190 -105 190 -121 0 -24 -99 -132 -158 -171 -94 -63 -185 -89 -307 -88 -119 1 -197 24 -294 87 -65 42 -165 150 -158 171 7 23 104 87 177 117 132 55 269 70 410 45z m-588 -589 c142 -91 280 -130 458 -130 233 0 415 72 580 229 l77 74 23 -68 c17 -49 24 -98 27 -182 6 -144 -10 -220 -74 -350 -40 -80 -61 -109 -137 -185 -146 -145 -293 -208 -491 -207 -201 0 -359 64 -502 203 -195 190 -261 463 -176 737 l16 53 71 -69 c39 -38 96 -85 128 -105z m-296 -945 c117 -59 273 -113 410 -142 129 -27 406 -38 554 -21 223 26 458 105 646 217 91 54 105 60 101 41 -3 -12 -128 -548 -278 -1190 -221 -942 -276 -1165 -285 -1152 -7 9 -96 164 -199 345 -103 182 -191 330 -195 330 -4 0 -92 -148 -195 -330 -103 -181 -192 -336 -199 -345 -9 -13 -64 210 -285 1152 -150 642 -275 1178 -278 1191 -5 22 -3 22 49 -12 30 -19 100 -57 154 -84z m985 -2570 l225 -397 -228 -3 c-125 -1 -331 -1 -456 0 l-228 3 225 397 c124 219 228 398 231 398 3 0 107 -179 231 -398z";

const interpolator = interpolatePath(SOCCER_BALL_PATH, TROPHY_PATH);

type Props = {
  isAnimated: boolean;
  showTrophy: boolean;
};

function SoccerBall({ isAnimated, showTrophy }: Props) {
  const rotation = useSharedValue(0);
  const scaleValue = useSharedValue(0);

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: rotation.value + "deg" },
        { scale: scaleValue.value },
      ],
    };
  });

  const transitionToTrophyIcon = useSharedValue(0);
  const ref = useRef<Path>(null);

  useEffect(() => {
    if (showTrophy) {
      transitionToTrophyIcon.value = withTiming(1, { duration: 5000 });
    } else {
      transitionToTrophyIcon.value = withTiming(0, { duration: 5000 });
    }
  }, [showTrophy]);

  useEffect(() => {
    if (isAnimated) {
      rotation.value = withRepeat(
        withTiming(1600, { duration: 5000, easing: Easing.in(Easing.quad) }),
        999,
        true
      );
      scaleValue.value = withDelay(3000, withTiming(0.1, { duration: 1500 }));
    } else {
      rotation.value = withTiming(0, { duration: 1000 });
      scaleValue.value = withTiming(1, { duration: 1000 });
    }
  }, [isAnimated]);
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
        },
        rotationStyle,
      ]}
    >
      <Svg
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <G
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#ffffff"
          stroke="none"
        >
          <AnimatedPath d={TROPHY_PATH} drawPath={showTrophy} />
          <AnimatedPath d={SOCCER_BALL_PATH} drawPath={!showTrophy} />
        </G>
      </Svg>
    </Animated.View>
  );
}

export default SoccerBall;
