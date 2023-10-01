import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { useNavigation } from '@react-navigation/native'
import { selectUserInfo } from '../slice/userSlice'
import { history } from '../utilies/WelcomeArrayItems'

const HistoryLink = () => {
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()
  const getUserInfo = useSelector(selectUserInfo)

  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

  const borderColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  history.sort((a, b) => b.amount - a.amount);
  const top3History = history.slice(0, 4);

  return (
    <View style={tailwind`mt-8`}>
      {history.length > 0 ?
        <View>
          <View style={tailwind`flex-row items-center justify-between`}>
            <Text style={[tailwind`text-[16px] pb-1 font-semibold`, { color }]}>Top Achievements</Text>
            <TouchableOpacity onPress={() => navigation.navigate("history")}>
              <Text style={[tailwind`text-[13px] pb-1 font-semibold`, { color }]}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={top3History}
            keyExtractor={item => item.id.toString()}
            style={tailwind`p-3`}
            renderItem={({ item }) => (
              <View style={[tailwind`p-2 border-l-4 my-2 rounded-md`,
              { backgroundColor: containerColor, borderColor }]}>
                <Text style={[tailwind`text-[15px] font-semibold`, { color }]}>{item.title}</Text>
                <Text style={[tailwind`text-[12px] pt-2`, { color: textColor }]}>You won {item.amount} coins on monday</Text>
              </View>
            )}
          />
        </View>
        :
        <View style={[tailwind`pt-6  px-4`]}>
          <Text style={[tailwind`text-center text-[14px]`, { color: color }]}>You have not attended any Quiz. Attend a quiz and get a chance of getting up to 50 coins. </Text>
          <View style={tailwind`flex-row justify-center  mt-4`}>
            <TouchableOpacity style={[tailwind`py-[8px] px-10 rounded-md`, { backgroundColor: borderColor }]} onPress={() => navigation.navigate("quiz")}>
              <Text style={[tailwind`font-bold text-[14px]`, { color: appTheme !== "dark" ? appColor.darkTextColor : appColor.lightTextColor }]}>Explore Quiz Categories</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  )
}

export default HistoryLink

const styles = StyleSheet.create({})