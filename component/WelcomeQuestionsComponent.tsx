import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';
import WelcomeResult from './WelcomeResult';
import WelcomeQuestion from './WelcomeQuestion';
import { selectShowResult } from '../slice/welcomeSlice';

const WelcomeQuestionsComponent = () => {
  const showResult = useSelector(selectShowResult)
  const appTheme = useSelector(selectAppTheme);

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  return (
    <View style={[
      tailwind`flex-1 pt-10`,
      { backgroundColor: bgColor }
      ]}>
      {!showResult?
      <WelcomeQuestion />
      :
      <WelcomeResult />
      }
    </View>
  );
};

export default WelcomeQuestionsComponent;

const styles = StyleSheet.create({}); 