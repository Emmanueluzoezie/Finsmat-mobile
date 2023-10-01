import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { useNavigation } from '@react-navigation/native'
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { solanaAddress } from '../utilies/solana'

const SettingComponent = () => {
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()
  const dispatch = useDispatch()

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const handleChangeTheme = () => {
      if(appTheme === "dark"){
        dispatch(setAppTheme("light"))
      } else {
        dispatch(setAppTheme("dark"))
      }
    }
    
  return (
    <View style={tailwind`flex-1 pb-4`}>
        <TouchableOpacity style={[
        tailwind`px-3 py-4 my-1 mt-2`,
        { backgroundColor: containerColor, borderColor: bgColor }
        ]}
        onPress={() => navigation.navigate("profile")}>

            <Text style={[tailwind`text-[16px] font-semibold`, { color }]}>Account Information</Text>
            <Text style={[tailwind`text-[13px] pt-1`, { color }]}>See all your account information like email and full name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[
        tailwind`px-3 py-4 my-1 flex-row items-center`,
        { backgroundColor: containerColor, borderColor: bgColor }
        ]}
        onPress={handleChangeTheme}>
          <View style={tailwind`pr-6 flex-1`}>
            <Text style={[tailwind`text-[16px] font-semibold`, { color }]}>Theme</Text>
          <Text style={[tailwind`text-[13px] pt-1`, { color }]}>Tap to change the theme</Text>
          </View>
          {appTheme === "dark" ?
            <Entypo name="light-up" size={20} color={color} />
            :
            <MaterialCommunityIcons name="shield-moon" size={24} color={color} />
          }
        </TouchableOpacity>
    </View>
  )
}

export default SettingComponent

const styles = StyleSheet.create({})