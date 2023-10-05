import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import HistoryLink from './HistoryLink'
import { selectUserInfo, selectUserRank } from '../slice/userSlice'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_EMAIL } from '../graphql/queries'
import { history } from '../utilies/WelcomeArrayItems'
import LoadingAppComponent from './LoadingAppComponent'


const ProfileComponent = () => {
  const [solanaAddress, setSolanaAddress] = useState("")
  const [copyMessage, setCopyMessage] = useState("")
  const getUserInfo = useSelector(selectUserInfo) 
  const userRank = useSelector(selectUserRank)
  const appTheme = useSelector(selectAppTheme)

  const { data, loading, error} = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: getUserInfo?.email
    }
  })

  if (loading) {
    console.log("loading...")
  }

  const userInfo = data?.getUserByEmail[0]
 
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(solanaAddress);
    setCopyMessage("copied")
    setTimeout(() => {
      setCopyMessage("")
    }, 2000)
  };

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
  const secondColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor



  return (
    <View style={tailwind`flex-1`}>
      {loading?
        <LoadingAppComponent />
        :
        error?
          <View style={[tailwind`flex-1 justify-center items-center`,]}>
            <Text style={[tailwind`text-[16px]`, { color, fontFamily: "Lato-Bold" }]}>Oops! An error occur in our end. Check your internet connection and try again</Text>
            <TouchableOpacity style={[tailwind`justify-center items-center px-4 mt-6 py-2 rounded-md`, { backgroundColor: buttonColor }]} onPress={() => navigation.goBack()}>
              <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>Click to reload</Text>
            </TouchableOpacity>
          </View>
          :
        <View style={tailwind`flex-1`}>
          <View style={tailwind`items-center py-4`}>
            <Image source={{ uri: userInfo?.image}} style={tailwind`w-[100px] h-[100px] rounded-full`} />
          </View>

          <View style={tailwind`pl-2 items-center`}>
            <Text style={[tailwind`text-[18px] pb-1 font-semibold mb-2`, { color, fontFamily: 'Lato-Bold' }]}
              numberOfLines={1}
              ellipsizeMode='tail'>{userInfo?.full_name}</Text>
            <View style={tailwind`flex-row w-[120px] `}>
              <Text style={[tailwind`text-[12px]`, { color: secondColor, fontFamily: 'Lato-Bold' }]}
                numberOfLines={1}
                ellipsizeMode='tail'
              >{userInfo?.user_sol_address}</Text>
              <Ionicons name="copy" size={14} color={buttonColor} onPress={copyToClipboard} style={tailwind`pl-3`} />
            </View>
            <Text style={[tailwind`text-[14px] py-1 `, { color: secondColor, fontFamily: 'Lato-Bold' }]}
              numberOfLines={1}
              ellipsizeMode='tail'>{userInfo?.email}</Text>
          </View>
          <Text style={[tailwind`font-semibold text-center text-[12px]`, { color: color, fontFamily: 'Lato-Bold' }]}>{copyMessage}</Text>
          <View style={tailwind`mt-4 p-2 flex-row items-center`}>
            <View style={[tailwind` border-r-2 py-3 flex-1 items-center justify-center`, {borderColor: color}]}>
              <View style={tailwind`flex-row items-center justify-center`}>
                <MaterialIcons name="person" size={20} color={color}/>
                <Text style={[tailwind`text-[15px] font-semibold pl-1`, { color, fontFamily: 'Lato-Bold' }]}>Rank</Text>
              </View>
              <Text style={[tailwind`text-[12px] mt-2 font-semibold`, { color: textColor, fontFamily: 'Lato-Bold' }]}>{userRank}</Text>
            </View>
            <View style={[tailwind` border-r-2 py-3 flex-1 items-center justify-center`, {borderColor: color}]}>
              <View style={tailwind`flex-row items-center justify-center`}>
                <Image source={require("../assets/investor.png")} style={tailwind`w-[15px] h-[15px]`} />
                <Text style={[tailwind`text-[15px] font-semibold pl-1`, { color, fontFamily: 'Lato-Bold' }]}>Badge</Text>
              </View>
              <Text style={[tailwind`text-[12px] mt-2 font-semibold capitalize`, { color: textColor, fontFamily: 'Lato-Bold' }]}>{userInfo?.badge}</Text>
            </View>
            <View style={[tailwind` border-r-2 py-3 flex-1 items-center justify-center`, {borderColor: color}]}>
              <View style={tailwind`flex-row items-center justify-center`}>
                <Image source={require("../assets/coins.png")} style={tailwind`w-[15px] h-[12px]`} />
                <Text style={[tailwind`text-[15px] font-semibold pl-1`, { color, fontFamily: 'Lato-Bold' }]}>Points</Text>
              </View>
              <Text style={[tailwind`text-[12px] mt-2 font-semibold capitalize`, { color: textColor, fontFamily: 'Lato-Bold' }]}>{userInfo?.coins}</Text>
            </View>
            <View style={tailwind` flex-1 items-center justify-center`}>
              <View style={tailwind`flex-row items-center justify-center`}>
                <FontAwesome5 name="coins" size={20} color={appColor.secondaryColor} />
                <Text style={[tailwind`text-[15px] font-semibold pl-1`, { color, fontFamily: 'Lato-Bold' }]}>Token</Text>
              </View>
              <Text style={[tailwind`text-[12px] mt-2 font-semibold`, { color: textColor, fontFamily: 'Lato-Bold' }]}>{userInfo?.token}</Text>
            </View>
          </View>
          <HistoryLink />
        </View>
      }
    </View> 
  )
}

export default ProfileComponent

const styles = StyleSheet.create({})