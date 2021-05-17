import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
const { width, height } = Dimensions.get("window");
export const SLIDE_HEIGHT = 0.61 * height;

interface SlideProps {
  label: string;
  right?: boolean;
}
const Slide = ({ label, right }: SlideProps) => {
  const transform = [
    {
      translateY: (SLIDE_HEIGHT - 100) / 2,
    },
    {
      translateX: right ? (width - 100) / 2 : -(width - 100) / 2,
    },
    {
      rotate: right ? "-90deg" : "90deg",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { transform }]}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: SLIDE_HEIGHT,
  },
  text: {
    fontSize: 80,
    color: "white",
    textAlign: "center",
    lineHeight: 80,
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
  },
});
