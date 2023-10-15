import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_USER } from '../graphql/queries'
import { selectAppTheme } from '../slice/AppSlices'
import { useSelector } from 'react-redux'
import tailwind from 'twrnc'
import LoadingAppComponent from './LoadingAppComponent'
import { appColor } from './AppColor'
import { useNavigation } from '@react-navigation/native'

const AddFriendsComponent = () => {
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()

    const { data, loading, error } = useQuery(GET_ALL_USER)

    const userInfo = data?.getUserList.slice(0, 20)

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <View style={tailwind`flex-1 mt-4 px-3`}>
        {loading ?
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
                <FlatList
                    data={userInfo}
                    keyExtractor={(user) => user.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[tailwind`p-3 rounded-md my-2 flex-row items-center`, { backgroundColor: containerColor }]}>
                            <Image source={{ uri: item?.image }} style={[tailwind`w-8 h-8 rounded-full`]} />
                            <Text style={[tailwind`font-semibold pb-1 text-[16px] flex-1 capitalize pl-3`, { color, fontFamily: 'Lato-Bold' }]}>{item?.full_name}</Text>
                            <TouchableOpacity style={[tailwind`py-[4px] px-[8px] text-[12px] rounded-md`, { color, fontFamily: 'Lato-Bold', backgroundColor: appColor.primaryDarkColor }]}>
                                <Text style={[tailwind`font-semibold text-[12px] capitalize`, { color, fontFamily: 'Lato-Bold', backgroundColor: appColor.primaryDarkColor }]}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                  />
        }
    </View>
  )
}

export default AddFriendsComponent

const styles = StyleSheet.create({})