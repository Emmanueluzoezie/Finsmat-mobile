import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from './AppColor'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const LeaderBoardHeader = ({ userInfo }) => {
  const appTheme = useSelector(selectAppTheme) 
  const navigation = useNavigation()

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <View style={tailwind`flex-row items-center pt-10 px-3`}>
      <TouchableOpacity style={[tailwind` rounded-full`, { backgroundColor: appColor.primaryDarkColor }]} onPress={() => navigation.navigate("profile")}>
        <Image source={{ uri: userInfo?.image }} style={tailwind`w-[35px] h-[35px] rounded-full`} />
      </TouchableOpacity>
      <Text style={[tailwind`flex-1 text-center text-[18px] text-[${color}] capitalize font-bold`, { fontFamily: 'Lato-Bold' }]}>Leaders Board</Text>
      <View style={tailwind`flex-row items-center`}>
        <Image source={require("../assets/coins.png")} style={tailwind`w-[15px] h-[12px]`} />
        <Text style={[tailwind`pl-1 text-[14px] text-[${color}] font-bold`, { fontFamily: 'Lato-Bold' }]}>{userInfo?.coins}</Text>
      </View>
    </View>
  )
}

export default LeaderBoardHeader

const styles = StyleSheet.create({})