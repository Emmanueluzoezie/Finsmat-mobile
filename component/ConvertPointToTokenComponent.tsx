import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { Entypo } from '@expo/vector-icons'
import { selectUserInfo } from '../slice/userSlice'
import { GET_USER_BY_EMAIL } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import LoadingAppComponent from './LoadingAppComponent'

const ConvertPointToTokenComponent = () => {
    const appTheme = useSelector(selectAppTheme)
    const getUserInfo = useSelector(selectUserInfo)

    const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: getUserInfo?.email
        }
    })

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
    const secondColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor


  return (
    <View style={tailwind`flex-1 px-3 pt-10`}>
          {loading?
            <LoadingAppComponent />
            :
            <View style={tailwind`flex-1`}>
                  <View style={tailwind`flex-row items-center`}>
                      <View style={tailwind`flex-1 pb-10`}>
                          <Text style={[tailwind`text-[16px]`, { fontFamily: 'Lato-Bold', color: color }]}>From</Text>
                          <View style={tailwind`mt-14 relative flex-row items-center`}>
                              <Image source={require('../assets/points.png')} style={tailwind`w-5 h-5`} />
                              <Text style={[
                                  tailwind`pl-2 text-[15px] font-semibold`,
                                  { color, fontFamily: 'Lato-Bold' }
                              ]}>Points</Text>
                          </View>
                      </View>
                      <View style={tailwind`w-[160px]`}>
                          <TextInput
                              placeholder='100'
                              placeholderTextColor="gray"
                              keyboardType='numeric'
                              style={[
                                  tailwind`border-[2px] py-3 px-2 rounded-md mb-1 text-[18px]`,
                                  { borderColor: "gray", fontFamily: "Lato-Bold" }
                              ]}
                          />
                          <Text style={[tailwind`text-[12px]`, { fontFamily: 'Lato-Bold', color: buttonColor }]}>Available $2,344</Text>
                      </View>
                  </View>
                  <View style={tailwind`flex-row items-center`}>
                      <View style={[
                          tailwind`border-[1px] flex-1`,
                          { borderColor: "gray" }
                      ]} />
                      <Entypo name="swap" size={24} color={color} style={tailwind`px-4`} />
                      <View style={[
                          tailwind`border-[1px] flex-1`,
                          { borderColor: 'gray' }
                      ]} />
                  </View>
                  <View style={tailwind`flex-row items-center pt-10`}>
                      <View style={tailwind`flex-1`}>
                          <Text style={[tailwind`text-[16px]`, { fontFamily: 'Lato-Bold', color }]}>To</Text>
                          <View style={tailwind`mt-14 flex-row items-center`}>
                              <Image source={require("../assets/tokenlogo.png")} style={tailwind`w-[30px] h-[30px]`} />
                              <Text style={[
                                  tailwind`pl-2 text-[15px] font-semibold`,
                                  { color, fontFamily: 'Lato-Bold' }
                              ]}>FSM Token</Text>
                          </View>
                      </View>
                      <View style={tailwind`w-[160px]`}>
                          <TextInput
                              placeholder='0'
                              placeholderTextColor="gray"
                              keyboardType='numeric'
                              style={[
                                  tailwind`border-[2px] py-3 px-2 rounded-md mb-1 text-[18px]`,
                                  { borderColor: "gray", fontFamily: "Lato-Bold" }
                              ]}
                          />
                          <Text style={[tailwind`text-[12px]`, { fontFamily: 'Lato-Bold', color: buttonColor }]}>Available $2,344</Text>
                      </View>
                  </View>
                  <View style={[tailwind`px-3 pt-[200px]`]}>
                    <TouchableOpacity style={[tailwind`p-2 rounded-md justify-center items-center`, {backgroundColor: buttonColor}]}>
                        <Text style={[tailwind`text-[18px]`, {fontFamily: "Lato-Bold", color: appTheme=== "dark"? appColor.lightTextColor : appColor.darkTextColor}]}>Convert</Text>
                    </TouchableOpacity>
                  </View>
            </View>
          }
    </View>
  )
}

export default ConvertPointToTokenComponent

const styles = StyleSheet.create({})