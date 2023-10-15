import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { useNavigation } from '@react-navigation/native'
import { Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { solanaAddress } from '../utilies/solana'
import { useQuery } from '@apollo/client'
import { selectUserInfo } from '../slice/userSlice'
import { GET_USER_BY_EMAIL } from '../graphql/queries'
import LoadingAppComponent from './LoadingAppComponent'

const SettingComponent = () => {
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const getUserInfo = useSelector(selectUserInfo)

  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: getUserInfo?.email
    }
  })

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

  const userInfo = data?.getUserByEmail[0]
    
  return (
    <View style={tailwind`flex-1 pb-4`}>
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
            <TouchableOpacity style={[
              tailwind`px-3 py-4 my-1 mt-2 flex-row items-center`,
              { backgroundColor: containerColor, borderColor: bgColor }
            ]}
              onPress={() => navigation.navigate("profile")}>
              <View style={tailwind`flex-1`}>
                <Text style={[tailwind`text-[16px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Account Information</Text>
                <Text style={[tailwind`text-[13px] pt-1`, { color, fontFamily: 'Lato-Bold' }]}>See all your account information like email and full name</Text>
              </View>
              <MaterialIcons name="chevron-right" size={30} color={color} />
            </TouchableOpacity>
            {userInfo.isAdminUser === true &&
              <TouchableOpacity style={[
                tailwind`px-3 py-4 my-1 mt-2 flex-row items-center`,
                { backgroundColor: containerColor, borderColor: bgColor }
              ]}
                onPress={() => navigation.navigate("add_question")}>
                <View style={tailwind`flex-1`}>
                  <Text style={[tailwind`text-[16px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Add Question</Text>
                  <Text style={[tailwind`text-[13px] pt-1`, { color, fontFamily: 'Lato-Bold' }]}>only admin user can add quiz questions</Text>
                </View>
                <MaterialIcons name="chevron-right" size={30} color={color} />
              </TouchableOpacity>
            }
            <TouchableOpacity style={[
              tailwind`px-3 py-4 my-1 flex-row items-center`,
              { backgroundColor: containerColor, borderColor: bgColor }
            ]}
              onPress={handleChangeTheme}>
              <View style={tailwind`pr-6 flex-1`}>
                <Text style={[tailwind`text-[16px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Theme</Text>
                <Text style={[tailwind`text-[13px] pt-1`, { color, fontFamily: 'Lato-Bold' }]}>Tap to change the theme</Text>
              </View>
              {appTheme === "dark" ?
                <Entypo name="light-up" size={20} color={color} />
                :
                <MaterialCommunityIcons name="shield-moon" size={24} color={color} />
              }
            </TouchableOpacity>
            <TouchableOpacity style={[
              tailwind`px-3 py-4 my-1 mt-2 flex-row items-center`,
              { backgroundColor: containerColor, borderColor: bgColor }
            ]}
              onPress={() => navigation.navigate("referal")}>
              <View style={tailwind`flex-1`}>
                <Text style={[tailwind`text-[16px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Referral</Text>
                <Text style={[tailwind`text-[13px] pt-1`, { color, fontFamily: 'Lato-Bold' }]}>Get your referral link</Text>
              </View>
              <MaterialIcons name="chevron-right" size={30} color={color} />
            </TouchableOpacity>
            <TouchableOpacity style={[
              tailwind`px-3 py-4 my-1 mt-2 flex-row items-center`,
              { backgroundColor: containerColor, borderColor: bgColor }
            ]}
              onPress={() => navigation.navigate("friends_list")}>
              <FontAwesome5 name="user-friends" size={16} color={color} />
              <View style={tailwind`flex-1 pl-2`}>
                <Text style={[tailwind`text-[16px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Friend List</Text>
                <Text style={[tailwind`text-[13px] pt-1`, { color, fontFamily: 'Lato-Bold' }]}>Find friends and pick who to challenge.</Text>
              </View>
              <MaterialIcons name="chevron-right" size={30} color={color} />
            </TouchableOpacity>
         </View>
        }
    </View>
  )
}

export default SettingComponent

const styles = StyleSheet.create({})