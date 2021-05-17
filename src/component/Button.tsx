import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface Props {
  label: string;
  variant: "primary" | "default";
  onPress: () => void;
}

const Button = ({ label, variant, onPress }: Props) => {
  const backgroundColor =
    variant === "default" ? "rgba(12,13,52,0.05)" : "#2CB9B0";
  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </RectButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
  },
});
