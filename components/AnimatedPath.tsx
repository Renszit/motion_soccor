import React, { useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Path } from "react-native-svg";

interface AnimatedStrokeProps {
  d: string;
  drawPath: boolean;
}

const ReanimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedPath = ({ d, drawPath }: AnimatedStrokeProps) => {
  const [length, setLength] = useState(-1);
  const animatedProgress = useSharedValue(0);
  useEffect(() => {
    animatedProgress.value = withDelay(
      drawPath ? 1500 : 0,
      withTiming(drawPath ? 1 : 0, { duration: 2000 })
    );
  }, [drawPath]);

  const ref = useRef<Path>(null);
  const animatedBGProps = useAnimatedProps(() => ({
    fillOpacity: animatedProgress.value,
    strokeDashoffset: length - length * animatedProgress.value,
    opacity: length === -1 ? 0 : 1,
    strokeWidth: 50 - 1 * animatedProgress.value,
  }));

  return (
    <ReanimatedPath
      ref={ref}
      onLayout={() => setLength(ref.current!.getTotalLength())}
      animatedProps={animatedBGProps}
      d={d}
      fill={"white"}
      stroke={"white"}
      strokeWidth={50}
      strokeDasharray={length}
    />
  );
};

export default AnimatedPath;
