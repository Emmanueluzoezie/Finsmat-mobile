import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import tailwind from 'twrnc';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';
import WelcomeResult from './WelcomeResult';
import WelcomeQuestion from './WelcomeQuestion';
import { selectShowResult } from '../slice/welcomeSlice';

const WelcomeQuestionsComponent = () => {
  const [logoLoading, setLogoLoading] = useState(true);
  const showResult = useSelector(selectShowResult)
  const appTheme = useSelector(selectAppTheme);
  const bounceValue = new Animated.Value(0);

  


  useEffect(() => {
    setTimeout(() => {
      setLogoLoading(false);
    }, 8000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(bounceValue, { toValue: 0.5, duration: 500, useNativeDriver: true }),
      ]),
      // { useNativeDriver: true }
    ).start();
  }, [bounceValue]);

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  return (
    <View style={[
      tailwind`flex-1`,
      { backgroundColor: bgColor }
      ]}>
      <View style={tailwind`flex-1 justify-center items-center`}>
        {logoLoading?
        <View style={styles.container}>
          <Animated.Image
            source={require("../assets/logoimage.png")}
            style={[styles.image, { transform: [{ scale: bounceValue }] }]}
          />
          <Text style={[tailwind`text-[24px]`, {fontFamily: "Lato-Bold", color: appColor.primaryColor ,}]}>FINANSMART</Text>
          <Text style={[tailwind`text-[14px]`, {fontFamily: "Lato-Bold", color: appColor.primaryColor}]}>Get smarter with your money</Text>
        </View>
        :
          <View style={tailwind`flex-1 pt-10`}>
            {!showResult?
            <WelcomeQuestion />
            :
            <WelcomeResult />
            }
          </View>
        }
      </View>
    </View>
  );
};

export default WelcomeQuestionsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    
  },

});