import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { useNavigation } from '@react-navigation/native'
import { selectUserId } from '../slice/userSlice'
import { useQuery } from '@apollo/client'
import { GET_ALL_HISTORY_BY_ID } from '../graphql/queries'

const HistoryLink = () => {
  const appTheme = useSelector(selectAppTheme)
  const getUserId = useSelector(selectUserId)
  const navigation = useNavigation()

  const { data, loading, error } = useQuery(GET_ALL_HISTORY_BY_ID, {
    variables: {
      user_id: getUserId
    }
  })

  const historyList = data?.getHistoryByUser_Id

  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

  const borderColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  historyList?.sort((a, b) => b.amount - a.amount);
  const top3History = historyList?.slice(0, 4);

  return (
    <View style={tailwind`flex-1`}>
      {loading?
        <View style={tailwind`flex-1`}>
          <ActivityIndicator size="large" color={borderColor} />
        </View>
        :
        error ?
          <View style={[tailwind`flex-1 justify-center items-center`,]}>
            <Text style={[tailwind`text-[16px]`, { color, fontFamily: "Lato-Bold" }]}>Oops! An error occur in our end. Check your internet connection and try again</Text>
            <TouchableOpacity style={[tailwind`justify-center items-center px-4 mt-6 py-2 rounded-md`, { backgroundColor: borderColor }]} onPress={() => navigation.goBack()}>
              <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>Click to reload</Text>
            </TouchableOpacity>
          </View>
        :
        <View style={tailwind`mt-8`}>
          {historyList.length > 0 ?
            <View>
              <View style={tailwind`flex-row items-center justify-between px-2`}>
                <Text style={[tailwind`text-[16px] pb-1 font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Top 3 Achievements</Text>
                <TouchableOpacity onPress={() => navigation.navigate("history")}>
                  <Text style={[tailwind`text-[13px] pb-1 font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={top3History}
                keyExtractor={item => item.id.toString()}
                style={tailwind`p-3`}
                renderItem={({ item }) => (
                  <View style={[tailwind`p-2 border-l-4 my-2 rounded-md`,
                  { backgroundColor: containerColor, borderColor }]}>
                    <Text style={[tailwind`text-[15px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>{item.title}</Text>
                    <Text style={[tailwind`text-[13px] pt-2`, { color: textColor, fontFamily: 'Lato-Regular' }]}>You won {item.amount} coins on monday</Text>
                  </View>
                )}
              />
            </View>
            :
            <View style={[tailwind`pt-6  px-4`]}>
              <Text style={[tailwind`text-center text-[14px]`, { color: color, fontFamily: 'Lato-Bold' }]}>You have not attended any Quiz. Attend a quiz and get a chance of getting up to 50 coins. </Text>
              <View style={tailwind`flex-row justify-center  mt-4`}>
                <TouchableOpacity style={[tailwind`py-[8px] px-10 rounded-md`, { backgroundColor: borderColor }]} onPress={() => navigation.navigate("quiz")}>
                  <Text style={[tailwind`font-bold text-[14px]`, { color: appTheme !== "dark" ? appColor.darkTextColor : appColor.lightTextColor, fontFamily: 'Lato-Bold' }]}>Explore Quiz Categories</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      }
    </View>
  )
}

export default HistoryLink

const styles = StyleSheet.create({})