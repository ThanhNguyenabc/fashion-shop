import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button } from "../component";
const { width } = Dimensions.get("window");

interface Props {
  subTitle: string;
  description: string;
  isLast?: boolean;
  onPress: () => void;
}
const SubSlide = ({ subTitle, description, isLast, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <Text style={styles.desc}>{description}</Text>
      <Button
        label={!isLast ? "Let's get started" : "Next"}
        variant={isLast ? "primary" : "default"}
        onPress={onPress}
      />
    </View>
  );
};

export default SubSlide;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 75,
    backgroundColor: "white",
    width,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0C0D34",
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginHorizontal: 16,
    color: "#0C0D34",
    marginBottom: 40,
  },
});
