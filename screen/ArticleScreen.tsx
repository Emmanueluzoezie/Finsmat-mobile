import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { selectAppTheme, selectCurrentArticleScreen, setCurrentArticleScreen, setCurrentScreen } from '../slice/AppSlices'
import { useDispatch, useSelector } from 'react-redux'
import { appColor } from '../component/AppColor'
import tailwind from 'twrnc'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import ListOfArticleComponent from '../component/ListOfArticleComponent'
import { useNavigation, useRoute } from '@react-navigation/native'

const ArticleScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const articleScreen = useSelector(selectCurrentArticleScreen)
    const dispatch = useDispatch()
    const route = useRoute<RouteParams>();
    const navigation = useNavigation()

    const previousScreen = route.params?.previousScreen;

    const handleBackButton = () => {
        dispatch(setCurrentScreen(previousScreen))
        navigation.goBack()
    }

    const bgColor = appTheme === "dark"? appColor.darkBackground : appColor.lightBackground

    const textColor = appTheme === "dark"? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const screenColor = appTheme === "dark"? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark"? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark"? appColor.darkTextColor : appColor.lightTextColor
  return (
    <View style={[tailwind`flex-1 pt-8`, { backgroundColor: bgColor }]}>
        <View style={tailwind`pr-3 flex-row py-2 items-center`}>
              <MaterialIcons name="chevron-left" onPress={() => navigation.goBack()}  title="Results"  size={30} color={color} />
        <Text style={[tailwind`text-center flex-1 text-[17px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Articles</Text>
        </View>
        <View style={tailwind`pl-2`}>
              <ListOfArticleComponent />
        </View>
    </View>
  )
}

export default ArticleScreen

const styles = StyleSheet.create({})