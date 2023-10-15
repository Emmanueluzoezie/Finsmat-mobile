import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import { friendsList } from '../utilies/SavingQuestions'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { useNavigation } from '@react-navigation/native'

const FriendsListComponent = () => {
  const [loading, setLoading] = useState(false)
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const handleChallenge = () => {

    }

  return (
    <View style={tailwind`flex-1 mt-4 px-3`}>
      {loading? 
        <View>
          <Text>loading</Text>
        </View>
        :
        <View style={tailwind`flex-1`}>
          {friendsList.length > 0?
              <FlatList
                data={friendsList}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity style={[tailwind`p-3 rounded-md my-2 flex-row items-center`, { backgroundColor: containerColor }]}>
                  <Image source={{ uri: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" }} style={[tailwind`w-8 h-8 rounded-full`]} />
                  <Text style={[tailwind`font-semibold pb-1 text-[16px] flex-1 capitalize pl-3`, { color, fontFamily: 'Lato-Bold' }]}>{item.friend_name}</Text>
                  <Text style={[tailwind`font-semibold py-[4px] px-[8px] text-[12px] text-center capitalize`, { color, fontFamily: 'Lato-Bold',backgroundColor: appColor.primaryDarkColor }]}>Challenge</Text>
              </TouchableOpacity>
              )}
              />
            :
              <View style={tailwind`flex-1 mt-10`}>
                <Text style={[tailwind`font-semibold pb-1 text-[16px] text-center pl-3`, { color, fontFamily: 'Lato-Regular' }]}>You current don't have any friend in your friends list</Text>
              <TouchableOpacity style={[tailwind`py-[5px] mt-4 rounded-md`, { backgroundColor: buttonColor }]} onPress={() => navigation.navigate("add_friends")}>
                <Text style={[tailwind`font-semibold pb-1 text-[16px] text-center pl-3`, { color: bgColor, fontFamily: 'Lato-Bold' }]}>Add Friend</Text>
                </TouchableOpacity>
              </View>
          }
        </View>
      }
    </View>
  )
}

export default FriendsListComponent

const styles = StyleSheet.create({})