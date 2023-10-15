import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddFriendsComponent from '../component/AddFriendsComponent'
import HeaderWithTwoItems from '../component/HeaderWithTwoItems'
import { MaterialIcons } from '@expo/vector-icons'
import tailwind from 'twrnc'
import { appColor } from '../component/AppColor'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { useQuery } from '@apollo/client'
import { GET_ALL_USER } from '../graphql/queries'

const AddFriendScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    return (
        <View style={[
            tailwind`flex-1 pt-10`,
            { backgroundColor: bgColor }
        ]}>
            <View style={tailwind`flex-row pl-1`}>
                <HeaderWithTwoItems
                    Icon={MaterialIcons}
                    name="chevron-left"
                    onPress={() => navigation.goBack()}
                    title="Add Friends"
                    size={30}
                />
            </View>
            <AddFriendsComponent />
        </View>
    )
}

export default AddFriendScreen

const styles = StyleSheet.create({})