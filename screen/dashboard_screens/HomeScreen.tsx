import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { selectAppTheme, selectNewUser, selectWeb3Auth, setConsole, setKey, setUserInfo } from '../../slice/AppSlices'
import { appColor } from '../../component/AppColor'
import HeaderComponent from '../../component/HeaderComponent'
import BottomNavigationContainer from '../../component/BottomNavigationContainer'
import HomeComponent from '../../component/dashboard/HomeComponent'
import WelcomeQuestionsComponent from '../../component/WelcomeQuestionsComponent'

const HomeScreen = () => {
  const appTheme = useSelector(selectAppTheme)
  const web3auth = useSelector(selectWeb3Auth)
  const isNewUser = useSelector(selectNewUser)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const bgColor = appTheme === "dark"? appColor.darkBackground : appColor.lightBackground

  const containerColor = appTheme === "dark"? appColor.darkContainerBackground: appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

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

  return (
    <View style={[
      tailwind`flex-1`,
      { backgroundColor: bgColor}
    ]}>
      <View style={[tailwind`flex-row items-center pt-10 pb-3 px-3`, { backgroundColor: containerColor }]}>
        <HeaderComponent
          IconOne={Entypo}
          IconTwo={Ionicons}
          nameOne="menu"
          nameTwo="notifications"
          onPressOne={() => navigation.dispatch(DrawerActions.openDrawer())}
          onPressTwo={() => {}}
          title=""
          sizeOne={24}
          sizeTwo={20}
        />
        <Ionicons name="person-circle" size={24} color={color} style={[tailwind`ml-2`]} onPress={() => navigation.navigate("profile")}/>
      </View>
      {
        isNewUser?
        <WelcomeQuestionsComponent />
        :
        <HomeComponent />
      }
      <BottomNavigationContainer />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})