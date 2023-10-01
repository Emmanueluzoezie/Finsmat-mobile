import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { selectAppTheme } from '../../slice/AppSlices'
import { useSelector } from 'react-redux'
import { appColor } from '../AppColor'
import tailwind from 'twrnc'

const QuizReminder = () => {
    const appTheme = useSelector(selectAppTheme)
   

  return (
    <View style={[
        tailwind`p-3 rounded-lg my-3`,
        {backgroundColor: appColor.primaryDarkColor }
    ]}>
      <Text style={[
        tailwind`text-[18px] font-semibold`,
        {color: appColor.lightTextColor }
      ]}>Daily Quiz</Text>
      <View style={[tailwind`flex-row items-center`]}>
          <Text style={[tailwind`flex-1 pr-2`,
        {color: appColor.lightTextColor}]}>Take your daily quiz, and win an extra prize to add to your rank</Text>
        <Image source={require("../../assets/quizss.png")} style={[tailwind`w-10 h-16`]} />
      </View>
      <Text style={[
              tailwind`text-[13px] font-semibold`,
        { color: appColor.primaryColor }
      ]}>12hrs Left</Text>
    </View>
  )
}

export default QuizReminder

const styles = StyleSheet.create({})