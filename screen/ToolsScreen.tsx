import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderWithTwoItems from '../component/HeaderWithTwoItems'
import tailwind from 'twrnc'
import { MaterialIcons } from '@expo/vector-icons'
import { appColor } from '../component/AppColor'
import { selectAppTheme, setCurrentScreen } from '../slice/AppSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import BottomNavigationContainer from '../component/BottomNavigationContainer'
import SettingComponent from '../component/SettingComponent'
import ToolsComponent from '../component/ToolsComponent'

const ToolsScreen = () => {
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
      tailwind`flex-1`,
      { backgroundColor: bgColor }
    ]}>
      <View style={[tailwind`flex-row pt-10`, {backgroundColor: containerColor}]}>
        <HeaderWithTwoItems
          Icon={MaterialIcons}
          name="chevron-left"
          onPress={handleBackButton}
          title="Tools"
          size={30}
        />
      </View>
      <View style={[tailwind`flex-1`]}>
        <ToolsComponent />
      </View>
      <BottomNavigationContainer />
    </View>
  )
}

export default ToolsScreen

const styles = StyleSheet.create({})