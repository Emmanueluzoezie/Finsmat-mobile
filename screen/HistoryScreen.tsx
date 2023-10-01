import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { selectAppTheme, setCurrentScreen } from '../slice/AppSlices'
import { useDispatch, useSelector } from 'react-redux'
import { appColor } from '../component/AppColor'
import { MaterialIcons } from '@expo/vector-icons'
import tailwind from 'twrnc'
import { useNavigation, useRoute } from '@react-navigation/native'
import HeaderWithTwoItems from '../component/HeaderWithTwoItems'
import { history } from '../utilies/WelcomeArrayItems'

const HistoryScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()
    const route = useRoute<RouteParams>();
    const dispatch = useDispatch()

    const previousScreen = route.params?.previousScreen;
    
    const handleBackButton = () => {
        dispatch(setCurrentScreen(previousScreen))
        navigation.goBack()
    }

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const borderColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    return (
        <View style={[
            tailwind`flex-1 py-10`,
            { backgroundColor: bgColor }
        ]}>
            <View style={tailwind`flex-row`}>
                <HeaderWithTwoItems
                    Icon={MaterialIcons}
                    name="chevron-left"
                    onPress={() => navigation.goBack()}
                    title="History"
                    size={30}
                />
            </View>
            {history.length > 0?
                <FlatList
                    style={tailwind`flex-1 py-4 px-4`}
                    data={history}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[tailwind`p-2 border-l-4 my-2 rounded-md`,
                        { backgroundColor: containerColor, borderColor }]}>
                            <Text style={[tailwind`text-[15px] font-semibold`, { color }]}>{item.title}</Text>
                            <Text style={[tailwind`text-[12px] pt-2`, { color }]}>You won {item.amount} coins on monday</Text>
                        </View>
                    )}
                />
                :
                <View style={[tailwind`pt-6  px-4`]}>
                    <Text style={[tailwind`text-center text-[16px]`, {color: color}]}>You have not attended any Quiz. Attend a quiz and get a chance of getting up to 50 coins. </Text>
                    <View style={tailwind`flex-row justify-center  mt-4`}>
                        <TouchableOpacity style={[tailwind`py-2 px-10 rounded-md`, { backgroundColor: borderColor }]} onPress={()=>  navigation.navigate("quiz")}>
                            <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme !== "dark" ? appColor.darkTextColor : appColor.lightTextColor }]}>Explore Quiz Categories</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({})