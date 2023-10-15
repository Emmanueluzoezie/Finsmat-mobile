import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import QuizReminder from './QuizReminder'
import QuizChellange from './QuizChellange'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { appColor } from '../AppColor'
import { AntDesign } from '@expo/vector-icons'
import LeaderBoardRank from '../LeaderBoardRank'

const HomeComponent = () => {
  const appTheme = useSelector(selectAppTheme)
    
  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  return (
      <View style={[tailwind`flex-1 px-3 py-4`]}>
        <QuizReminder />
        <QuizChellange />
        <LeaderBoardRank />
      </View>
  )
}

export default HomeComponent

const styles = StyleSheet.create({})