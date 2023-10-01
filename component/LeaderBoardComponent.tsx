import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from './AppColor'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { FlatList } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'

const leadersBoard = [
  {
    name: "Emmanuel",
    image: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png",
    id: 1,
    rank: 1
  },
  {
    name: "sunday",
    image: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png",
    id: 2,
    rank: 1
  },
  {
    name: "Felix",
    image: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png",
    id: 3,
    rank: 1
  },
  {
    name: "Jame",
    image: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png",
    id: 4,
    rank: 1
  },
  {
    name: "Emmanuel",
    image: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png",
    id: 5,
    rank: 1
  },
  {
    name: "sunday",
    image: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png",
    id: 6,
    rank: 1
  },
  {
    name: "Felix",
    image: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png",
    id: 7,
    rank: 1
  },
  {
    name: "Jame",
    image: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png",
    id: 8,
    rank: 1
  },
]

const LeaderBoardComponent = () => {
  const appTheme = useSelector(selectAppTheme) 

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
  return (
    <View style={tailwind`flex-1 pt-6`}>
        {/*Top 3 Leaders with highest coins */}
        <View style={tailwind`flex-row justify-center items-end px-6 pb-2`}>
          <View style={tailwind`flex-1 justify-center items-center`}>
            <View style={[tailwind` rounded-full p-2 m-1 relative `, { backgroundColor: appColor.secondaryColor }]}>
              <Image source={{ uri: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png" }} style={tailwind`w-[52px] h-[52px] rounded-full`} />
            <View style={tailwind`absolute bottom-[-3] p-1 left-[30%] rounded-full w-5 items-center justify-center h-5 bg-[${appColor.primaryDarkColor}]`}>
                    <Text style={tailwind`font-bold text-black`}>2</Text>
                </View>
            </View> 
          <Text style={[tailwind`mt-4 font-semibold text-[12px]`, {color}]}>Emmanuel</Text>
          </View>
          <View style={tailwind`flex-1 justify-center items-center`}>
            <View style={[tailwind` rounded-full p-2 m-1 relative `, { backgroundColor: appColor.primaryDarkColor }]}>
              <Image source={{ uri: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png" }} style={tailwind`w-[75px] h-[75px] rounded-full`} />
            <View style={tailwind`absolute bottom-[-3] bg-[${appColor.secondaryColor}]  left-[40%] rounded-full w-6 items-center justify-center h-6`}>
                    <Text style={tailwind`font-bold text-white`}>1</Text>
                </View>
            </View>
            <Text style={[tailwind`mt-4 font-semibold text-[12px]`, { color }]}>Emmanuel</Text>
          </View>
          <View style={tailwind`flex-1 justify-center items-center`}>
            <View style={[tailwind` rounded-full p-2 m-1 relative `, { backgroundColor: appColor.ternaryColor }]}>
              <Image source={{ uri: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png" }} style={tailwind`w-[42px] h-[42px] rounded-full`} />
            <View style={tailwind`absolute bottom-[-2] left-[25%] rounded-full w-4 items-center justify-center h-4 bg-[${appColor.primaryColor}]`}>
                    <Text style={tailwind`font-bold text-white text-[12px]`}>3</Text>
                </View>
            </View>
          <Text style={[tailwind`mt-4 font-semibold text-[12px]`, { color }]}>Emmanuel</Text>
          </View>
        </View>
      <View style={tailwind`flex-1`}>
        <FlatList
          style={tailwind`flex-1 pt-2 mb-4 pb-4 px-3`}
          data={leadersBoard}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <View style={[tailwind`flex-row justify-between items-center mt-3 pb-2`]}>
              <Text style={[tailwind`font-semibold text-[16px]`, {color}]}>Top 20 overall Leaders board</Text>
              <View style={tailwind`flex-row items-center`}>
                <Text style={[tailwind`pr-1 font-semibold`, {color}]}>Sort</Text>
                <AntDesign name="caretdown" size={12} color={color} />
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[tailwind`flex-row items-center my-2 p-2 rounded-md`, {backgroundColor: containerColor}]}>
              <Text style={[tailwind`px-2 font-bold text-[18px]`, {color: buttonColor}]}>{item.rank}</Text>
              <Image source={{ uri: item.image }} style={[tailwind`w-12 h-12 mx-3`]} />
              <Text style={[tailwind`flex-1 text-[17px] font-semibold`, {color}]}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default LeaderBoardComponent

const styles = StyleSheet.create({})