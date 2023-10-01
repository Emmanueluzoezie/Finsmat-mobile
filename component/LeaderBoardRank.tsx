import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import tailwind from 'twrnc'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const LeaderBoardRank = () => {
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const primary = appTheme === "dark"? appColor.primaryDarkColor : appColor.primaryColor 

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground: appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
  return (
      <View style={[tailwind`mt-4`]}>
          <View style={[tailwind`flex-row justify-between items-center p-2`]}>
              <Text style={[
                  tailwind`font-semibold text-[16px]`,
                  { color }
              ]}>LeaderBoard</Text>
              <TouchableOpacity onPress={() => navigation.navigate("leaderboard")} >
                  <View style={[tailwind`flex-row items-center`]}>
                      <Text style={[
                          tailwind` px-2 font-semibold`,
                          { color }
                      ]}>See all</Text>
                      <AntDesign name="caretdown" size={12} color={color} />
                  </View>
              </TouchableOpacity>
          </View>
          <View style={[tailwind`p-2 rounded-md my-2`, {backgroundColor: appColor.primaryDarkColor}]}>
              <Text style={[tailwind`pl-4 font-semibold`]}>Your rank</Text>
              <View style={tailwind`flex-row items-center px-2`}>
                <Text style={{color: appColor.lightTextColor}}>4</Text>
                  <Image source={{ uri: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png" }} style={[tailwind`w-12 h-12 mx-3`]} />
                  <View style={tailwind`flex-1`}>
                      <Text style={[tailwind`font-semibold pb-1 text-[16px]`, { color: appColor.lightTextColor }]}>Cynthia onyeka</Text>
                      <Text style={[tailwind`text-[13px]`, { color: textColor }]}>Over all Quiz</Text>
                </View>
                  <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`]}>
                      <AntDesign name="caretdown" size={12} color={primary} />
                </TouchableOpacity>
              </View>
          </View>
          <View style={[tailwind`p-2 rounded-md my-2`, { backgroundColor: containerColor }]}>
              <View style={tailwind`flex-row items-center px-2`}>
                  <Text style={{color}}>4</Text>
                  <Image source={{ uri: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png" }} style={[tailwind`w-12 h-12 mx-3`]} />
                  <View style={tailwind`flex-1`}>
                      <Text style={[tailwind`font-semibold pb-1 text-[16px]`, {color}]}>Cynthia onyeka</Text>
                      <Text style={[tailwind`text-[13px]`, { color: textColor }]}>Over all Quiz</Text>
                  </View>
                  <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`]}>
                      <AntDesign name="caretdown" size={12} color={primary} />
                  </TouchableOpacity>
              </View>
          </View>
          <View style={[tailwind`p-2 rounded-md my-2`, { backgroundColor: containerColor }]}>
              <View style={tailwind`flex-row items-center px-2`}>
                  <Text style={{color}}>4</Text>
                  <Image source={{ uri: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png" }} style={[tailwind`w-12 h-12 mx-3`]} />
                  <View style={tailwind`flex-1`}>
                      <Text style={[tailwind`font-semibold pb-1 text-[16px]`, {color}]}>Cynthia onyeka</Text>
                      <Text style={[tailwind`text-[13px]`, {color:  textColor}]}>Over all Quiz</Text>
                  </View>
                  <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`,
                ]}>
                      <AntDesign name="caretdown" size={12} color={primary} />
                  </TouchableOpacity>
              </View>
          </View>
          <View style={[tailwind`p-2 rounded-md my-2`, { backgroundColor: containerColor }]}>
              <View style={tailwind`flex-row items-center px-2`}>
                  <Text style={{color}}>4</Text>
                  <Image source={{ uri: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png" }} style={[tailwind`w-12 h-12 mx-3`]} />
                  <View style={tailwind`flex-1`}>
                      <Text style={[tailwind`font-bold pb-1 text-[16px]`, {color}]}>Cynthia onyeka</Text>
                      <Text style={[tailwind`text-[13px]`, {color}]}>Over all Quiz</Text>
                  </View>
                  <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px]`,
                  {backgroundColor:appTheme === "dark"? appColor.lightBackground: appColor.darkBackground}
                ]}>
                      <AntDesign name="caretdown" size={12} color={primary} />
                  </TouchableOpacity>
              </View>
          </View>
          <View style={[tailwind`p-2 rounded-md my-2`, { backgroundColor: containerColor }]}>
              <View style={tailwind`flex-row items-center px-2`}>
                  <Text style={{color}}>4</Text>
                  <Image source={{ uri: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png" }} style={[tailwind`w-12 h-12 mx-3`]} />
                  <View style={tailwind`flex-1`}>
                      <Text style={[tailwind`font-bold pb-1 text-[16px]`, {color}]}>Cynthia onyeka</Text>
                      <Text style={[tailwind`text-[13px]`, {color}]}>Over all Quiz</Text>
                  </View>
                  <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px]`,
                  {backgroundColor:appTheme === "dark"? appColor.lightBackground: appColor.darkBackground}
                ]}>
                      <AntDesign name="caretdown" size={12} color={appColor.primaryColor} />
                  </TouchableOpacity>
              </View>
          </View>
      </View>
  )
}

export default LeaderBoardRank

const styles = StyleSheet.create({})