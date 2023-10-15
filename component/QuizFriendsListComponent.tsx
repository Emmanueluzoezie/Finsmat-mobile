import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import { friendsList } from '../utilies/SavingQuestions'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { useNavigation } from '@react-navigation/native'
import LoadingAppComponent from './LoadingAppComponent'
import { setFriendDetails, setSelectedFriend } from '../slice/QuizSlice'

const QuizFriendsListComponent = () => {
    const [loading, setLoading] = useState(false)
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const handleChallenge = (clickedDetails) => {
        dispatch(setFriendDetails({
            friend_id: clickedDetails.friend_id,
            friend_name: clickedDetails.friend_name,
        }))
        dispatch(setSelectedFriend(true))
    }

    return (
        <View style={tailwind`flex-1 mt-4 px-3`}>
            {loading ?
                <LoadingAppComponent />
                :
                <View style={tailwind`flex-1`}>
                    {friendsList.length > 0 ?
                        <View style={tailwind`flex-1 mt-4`}>
                            <Text style={[tailwind`font-semibold text-center pb-1 text-[16px] capitalize pl-3`, { color, fontFamily: 'Lato-Bold' }]}>All friends</Text>
                            <FlatList
                                data={friendsList}
                                keyExtractor={(user) => user.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={[tailwind`p-3 rounded-md my-2 flex-row items-center`, { backgroundColor: containerColor }]} onPress={() => handleChallenge(item)}>
                                        <Image source={{ uri: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" }} style={[tailwind`w-8 h-8 rounded-full`]} />
                                        <Text style={[tailwind`font-semibold pb-1 text-[16px] flex-1 capitalize pl-3`, { color, fontFamily: 'Lato-Bold' }]}>{item.friend_name}</Text>
                                        <Text style={[tailwind`font-semibold py-[4px] px-[8px] text-[12px] text-center capitalize`, { color: appColor.lightTextColor, fontFamily: 'Lato-Bold', backgroundColor: appColor.primaryDarkColor }]}>Challenge</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
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

export default QuizFriendsListComponent

const styles = StyleSheet.create({})