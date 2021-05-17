import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  divide,
  interpolate,
  interpolateColor,
  multiply,
  useSharedValue,
  useValue,
} from "react-native-reanimated";
import { Dot } from "../component";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import SubSlide from "./SubSlide";

const { width, height } = Dimensions.get("window");
const BORDER_RADIUS = 75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    backgroundColor: "red",
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    height: BORDER_RADIUS,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

const slides = [
  {
    label: "Relaxed",
    color: "#BFEAF5",
    subTitle: "Find Your Outfits",
    description:
      "Confused about outfit? Don't worry! Find the best outfit here",
  },
  {
    label: "Playful",
    color: "#BEECC4",
    subTitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
  },
  {
    label: "Excentric",
    color: "#FFE4D9",
    subTitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday",
  },
  {
    label: "Funky",
    color: "#FFDADD",
    subTitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
  },
];
const OnBoarding = () => {
  const [x, setX] = useState(0);
  const scrollX = useSharedValue(x);
  const scroll = useRef<Animated.ScrollView>(null);
  const onScroll = ({ nativeEvent }) => {
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
            return <Slide key={index} label={item.label} right={index % 2} />;
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
              return (
                <SubSlide
                  key={index}
                  {...{ subTitle, description }}
                  isLast={index === slides.length - 1}
                  onPress={() => {
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
