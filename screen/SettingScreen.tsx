import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setAppTheme, setCurrentScreen } from '../slice/AppSlices'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { appColor } from '../component/AppColor'
import HeaderComponent from '../component/HeaderComponent'
import SettingComponent from '../component/SettingComponent'
import HeaderWithTwoItems from '../component/HeaderWithTwoItems'
import { selectWeb3Auth, setConsole, setKey, setUserInfo } from '../slice/userSlice'

const SettingScreen = () => {
  const appTheme = useSelector(selectAppTheme)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const web3auth = useSelector(selectWeb3Auth)
  const route = useRoute<RouteParams>();

  const previousScreen = route.params?.previousScreen;

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const logout = async () => {
        if (!web3auth) {
            dispatch(setConsole("Web3auth not initialized"));
            return;
        }

        dispatch(setConsole("Logging out"));
        await web3auth.logout();

        if (!web3auth.privKey) {
            dispatch(setUserInfo(undefined));
            dispatch(setKey(""));
        }
    };

  const handleBackButton = () => {
    dispatch(setCurrentScreen(previousScreen))
    navigation.goBack()
  }

  return (
    <View style={[
      tailwind`flex-1`,
      { backgroundColor: bgColor }
    ]}>
      <View style={[tailwind`flex-row items-center pt-10 pb-3 px-3`, { backgroundColor: containerColor }]}>
          <HeaderWithTwoItems
            Icon={MaterialIcons}
            name="chevron-left"
            onPress={handleBackButton}
            title="Settings"
            size={30}
          />
      </View>
      <SettingComponent />
      <View style={tailwind`px-4 pb-10`}>
        <TouchableOpacity style={[tailwind`flex-row justify-center p-[12px] rounded-md`,
        { backgroundColor: appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor }
        ]} onPress={logout}>
          <Text style={[
            tailwind`font-bold text-[16px]`,
            { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor }
          ]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})