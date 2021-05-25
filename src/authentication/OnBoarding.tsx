import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { interpolateColor, multiply } from "react-native-reanimated";
import { Dot, Theme } from "../component";
import { slides } from "../mock_data/Slides";
import { Routes } from "../navigation";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import SubSlide from "./SubSlide";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    backgroundColor: "red",
    borderBottomRightRadius: Theme.borderRadius.xl,
  },
  footer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    borderTopLeftRadius: Theme.borderRadius.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    height: Theme.borderRadius.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

const OnBoarding = ({ navigation }: StackScreenProps<Routes, "Onboarding">) => {
  const [x, setX] = useState(0);
  const scroll = useRef<Animated.ScrollView>(null);
  const onScroll = ({ nativeEvent }: any) => {
    const { x } = nativeEvent.contentOffset;
    setX(x);
  };
  const backgroundColor = interpolateColor(
    x,
    slides.map((_, index) => width * index),
    slides.map((item, index) => item.color)
  );
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          horizontal
          ref={scroll}
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={onScroll}
        >
          {slides.map((item, index) => {
            return (
              <Slide
                key={index}
                label={item.label}
                right={index % 2 != 0 ? true : false}
              />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />

        <View style={[styles.footerContainer]}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} {...{ index, x }} currentIndex={x / width} />
            ))}
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                marginTop: 60,
                flexDirection: "row",
                transform: [{ translateX: multiply(x, -1) }],
              },
            ]}
          >
            {slides.map(({ subTitle, description }, index) => {
              const isLast = index === slides.length - 1;
              return (
                <SubSlide
                  key={index}
                  {...{ subTitle, description, isLast }}
                  isLast={isLast}
                  onPress={() => {
                    if (isLast) {
                      navigation?.navigate("Welcome");
                      return;
                    }
                    if (scroll.current) {
                      scroll.current.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
