import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import tailwind from 'twrnc'
import HeaderWithTwoItems from '../component/HeaderWithTwoItems'
import { MaterialIcons } from '@expo/vector-icons'
import { appColor } from '../component/AppColor'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { selectAppTheme, setCurrentScreen } from '../slice/AppSlices'
import BottomNavigationContainer from '../component/BottomNavigationContainer'
import LeaderBoardHeader from '../component/LeaderBoardHeader'
import LeaderBoardComponent from '../component/LeaderBoardComponent'
import { selectUserInfo } from '../slice/userSlice'
import { GET_USER_BY_EMAIL } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const LeaderShipBoardScreen = () => {
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()
  const getUserInfo = useSelector(selectUserInfo)
  const route = useRoute()
  const dispatch = useDispatch()

  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: getUserInfo?.email
    }
  })

  const userInfo = data?.getUserByEmail[0]


  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const borderColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  useEffect(() => {
    dispatch(setCurrentScreen(route.name))
  }, [])

  return (
    <View style={[
      tailwind`flex-1`,
      { backgroundColor: bgColor }
    ]}>
      {loading ?
        <View style={tailwind`flex-1`}>
          <ActivityIndicator size="small" color={borderColor} />
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
        <View style={tailwind`flex-1`}>
            <LeaderBoardHeader userInfo={userInfo} />
            <LeaderBoardComponent />
        </View>
      }
      <BottomNavigationContainer />
    </View>
  )
}

export default LeaderShipBoardScreen

const styles = StyleSheet.create({})