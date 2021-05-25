import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding, { Welcome } from "./src/authentication";
import { NavigationContainer } from "@react-navigation/native";
import theme from "./src/component/Theme";
import { Routes } from "./src/navigation";

const AuthenticationStack = createStackNavigator<Routes>();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={OnBoarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
    </AuthenticationStack.Navigator>
  );
};
export default () => {
  return (
    <NavigationContainer theme={theme}>
      <AuthenticationNavigator />
    </NavigationContainer>
  );
};
