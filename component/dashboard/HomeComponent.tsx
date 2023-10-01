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
    <ScrollView>
      <View style={[tailwind`flex-1 px-3 py-4`]}>
        <QuizReminder />
        <QuizChellange />
        {/* <View style={[tailwind`flex-row p-[10px] border-l-2 font-semibold my-6 rounded-lg`, { backgroundColor: containerColor, borderColor:appColor.primaryColor}]}>
          <View style={[{ backgroundColor: containerColor, }
          ]}>
            <Image source={require("../../assets/bulbimage.png")} style={[tailwind`w-12 h-18`]} />
          </View>
          <View style={[tailwind`flex-1 justify-between`]}>
            <Text style={[
              tailwind` px-2`,
              { color }
            ]}>Calculate by input your saving goal, time frame, and initial investment.</Text>
            <TouchableOpacity>
              <Text style={[
                tailwind` pl-10 font-semibold`,
                { color: appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor }
              ]}>See how money grows</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <LeaderBoardRank />
      </View>
    </ScrollView>
  )
}

export default HomeComponent

const styles = StyleSheet.create({})