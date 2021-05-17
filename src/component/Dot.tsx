import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  Value,
} from "react-native-reanimated";
interface DotProps {
  index: number;
  currentIndex: number;
}

const Dot = ({ index, currentIndex }: DotProps) => {
  const value = new Value(currentIndex);
  const opacity = value.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const scale = value.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ scale }] }]}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    backgroundColor: "#2CB9B0",
    borderRadius: 4,
    margin: 4,
  },
});
