import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import { appColor } from './AppColor'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { FlatList } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import { users } from '../utilies/AppObjects'
import { selectUserInfo } from '../slice/userSlice'
import { useQuery } from '@apollo/client'
import { GET_ALL_USER } from '../graphql/queries'
import LoadingAppComponent from './LoadingAppComponent'
import { useNavigation } from '@react-navigation/native'

const LeaderBoardComponent = () => {
  const [userRank, setUserRank] = useState(0)
  const [userDetails, setUserDetails] = useState<any>({})
  const appTheme = useSelector(selectAppTheme)
  const getUserInfo = useSelector(selectUserInfo)
  const navigation = useNavigation()

  const { data, loading, error } = useQuery(GET_ALL_USER)

  const userInfo = data?.getUserList

  const userInfoCopy = [...userInfo];

  // Sort the copy
  const sortedList = userInfoCopy.sort((a, b) => b.coins - a.coins);

  // Get the top 20 leaders
  const top20Leader = sortedList.slice(0, 20);

  useEffect(() => {
    // Create a copy of userInfo
    const userInfoCopy = [...userInfo];
    const sortedUsers = userInfoCopy.sort((a, b) => b.coins - a.coins);

    const currentUserIndex = sortedUsers.findIndex((user) => user.full_name === getUserInfo.name);

    if (currentUserIndex !== -1) {
      const currentUser = sortedUsers[currentUserIndex];
      setUserDetails(currentUser);
      setUserRank(currentUserIndex + 1);
    } else {
      return;
    }
  }, []);

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
  return (
    <View style={tailwind`flex-1 pt-6`}>
      {loading?
        <LoadingAppComponent />
          :
        error ?
          <View style={[tailwind`flex-1 justify-center items-center`,]}>
            <Text style={[tailwind`text-[16px]`, { color, fontFamily: "Lato-Bold" }]}>Oops! An error occur in our end. Check your internet connection and try again</Text>
            <TouchableOpacity style={[tailwind`justify-center items-center px-4 mt-6 py-2 rounded-md`, { backgroundColor: buttonColor }]} onPress={() => navigation.goBack()}>
              <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>Click to reload</Text>
            </TouchableOpacity>
          </View>
          :
        <View style={tailwind`flex-1 pt-6`}>
            {/*Top 3 Leaders with highest coins */}
            <View style={tailwind`flex-row justify-center items-end px-6 pb-2`}>
              <View style={tailwind`flex-1 justify-center items-center`}>
                <View style={[tailwind` rounded-full p-2 m-1 relative `, { backgroundColor: appColor.secondaryColor }]}>
                <Image source={{ uri: top20Leader[1]?.image }} style={tailwind`w-[52px] h-[52px] rounded-full`} />
                <View style={tailwind`absolute bottom-[-3] p-1 left-[30%] rounded-full w-5 items-center justify-center h-5 bg-[${appColor.primaryDarkColor}]`}>
                  <Text style={[tailwind`font-bold text-black`, { fontFamily: 'Lato-Bold' }]}>2</Text>
                </View>
              </View> 
              <View style={tailwind`w-[100px]`}>
                <Text style={[tailwind`mt-4 font-semibold text-[12px] text-center`, 
                  { color, fontFamily: 'Lato-Bold' }]}
                  numberOfLines={1}
                  ellipsizeMode='tail'>{top20Leader[1]?.full_name}</Text>
              </View>
              </View>
              <View style={tailwind`flex-1 justify-center items-center`}>
                <View style={[tailwind` rounded-full p-2 m-1 relative `, { backgroundColor: appColor.primaryDarkColor }]}>
                <Image source={{ uri: top20Leader[0]?.image }} style={tailwind`w-[75px] h-[75px] rounded-full`} />
                <View style={tailwind`absolute bottom-[-3] bg-[${appColor.secondaryColor}]  left-[40%] rounded-full w-6 items-center justify-center h-6`}>
                  <Text style={[tailwind`font-bold text-white`, { fontFamily: 'Lato-Bold' }]}>1</Text>
                    </View>
                </View>
              <View style={tailwind`w-[100px]`}>
                <Text style={[tailwind`mt-4 font-semibold text-[12px] text-center`,
                  { color, fontFamily: 'Lato-Bold' }]}
                  numberOfLines={1}
                  ellipsizeMode='tail'>{top20Leader[0]?.full_name}</Text>
              </View>
              </View>
              <View style={tailwind`flex-1 justify-center items-center`}>
                <View style={[tailwind` rounded-full p-2 m-1 relative `, { backgroundColor: appColor.ternaryColor }]}>
                <Image source={{ uri: top20Leader[2]?.image }} style={tailwind`w-[42px] h-[42px] rounded-full`} />
                <View style={tailwind`absolute bottom-[-2] left-[25%] rounded-full w-4 items-center justify-center h-4 bg-[${appColor.primaryColor}]`}>
                  <Text style={[tailwind`font-bold text-white text-[12px]`, { fontFamily: 'Lato-Bold' }]}>3</Text>
                    </View>
                </View>
              <View style={tailwind`w-[100px]`}>
                <Text style={[tailwind`mt-4 font-semibold text-[12px] text-center`,
                  { color, fontFamily: 'Lato-Bold' }]}
                  numberOfLines={1}
                    ellipsizeMode='tail'>{top20Leader[2]?.full_name}</Text>
              </View>
              </View>
            </View>
          <View style={tailwind`flex-1 px-4`}>
            <View style={[tailwind`flex-row justify-between items-center mt-3 pb-2`]}>
              <Text style={[tailwind`font-semibold text-[16px]`, { color, fontFamily: 'Lato-Bold' }]}>Top 20 overall Leaders board</Text>
              <View style={tailwind`flex-row items-center`}>
                <Text style={[tailwind`pr-1 font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Sort</Text>
                <AntDesign name="caretdown" size={12} color={color} />
              </View>
            </View>
            <View style={[tailwind`p-2 rounded-md my-2`, { backgroundColor: appColor.primaryDarkColor }]}>
              <Text style={[tailwind`pl-4 font-semibold`, { fontFamily: 'Lato-Bold' }]}>Your rank</Text>
              <View style={tailwind`flex-row items-center px-2`}>
                <Text style={{ color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }}>{userRank}</Text>
                <Image source={{ uri: userDetails?.image }} style={[tailwind`w-10 h-10 mx-3 rounded-full`]} />
                <View style={tailwind`flex-1`}>
                  <Text style={[tailwind`font-semibold pb-1 text-[16px]`, { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }]}>{userDetails?.full_name}</Text>
                  <Text style={[tailwind`text-[13px]`, { color: "black", fontFamily: 'Lato-Regular' }]}>Over all Quiz</Text>
                </View>
                <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`]}>
                  <AntDesign name="caretdown" size={12} color={buttonColor} />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={top20Leader}
              keyExtractor={(user) => user.id.toString()}
              renderItem={({ item, index }) => {
                if (item?.full_name === userDetails?.full_name) {
                  return null; // Hide the item
                }
                return (<View style={[tailwind`p-2 rounded-md my-2 ${item?.full_name === userDetails?.full_name && "hidden"}`, { backgroundColor: containerColor }]}>
                  <View style={tailwind`flex-row items-center px-2`}>
                    <Text style={{ color, fontFamily: 'Lato-Bold' }}>{index + 1}</Text>
                    <Image source={{ uri: item?.image }} style={[tailwind`w-10 h-10 mx-3 rounded-full`]} />
                    <View style={tailwind`flex-1`}>
                      <Text style={[tailwind`font-semibold pb-1 text-[16px]`, { color, fontFamily: 'Lato-Bold' }]}>{item?.full_name}</Text>
                    </View>
                    <TouchableOpacity style={[tailwind`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`]}>
                      <AntDesign name="caretdown" size={12} color={buttonColor} />
                    </TouchableOpacity>
                  </View>
                </View>)
              }}
            />
          </View>
        </View>
      }
    </View>
  )
}

export default LeaderBoardComponent

const styles = StyleSheet.create({})