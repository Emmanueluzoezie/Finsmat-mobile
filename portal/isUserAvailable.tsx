import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from 'react-redux';
import UnauthenticatedUser from './unauthenticatedUser';
import AuthenticatedUser from "./authenticatedUser"
import {  selectIsUserLogin, selectNewUser } from '../slice/AppSlices';
import WelcomeQuestionsComponent from '../component/WelcomeQuestionsComponent';
import tailwind from 'twrnc';
import { selectKey, setKey, setUserInfo, setWeb3Auth } from '../slice/userSlice';
import { useFonts } from 'expo-font';
import * as Splash from "expo-splash-screen"
// import * as Font from 'expo-font';


const clientId = process.env.WEB3AUTH_CLIENT_ID

// Function to load custom fonts
// const loadFonts = async () => {
//   await Font.loadAsync({
//     'Lato-Regular': require('../assets/Lato/Lato-Regular.ttf'),
//     'Lato-Bold': require('../assets/Lato/Lato-Regular.ttf'), // Load Lato-Bold font
//     // Load other Lato font styles if needed
//   });
// };

// loadFonts();

// const customFonts = {
//   'Lato-Regular': require('../assets/Lato/Lato-Regular.ttf'),
//   'Lato-Bold': require('../assets/Lato/Lato-Regular.ttf')
// }

const IsUserAvailable = () => {
  const isUserAvailable = useSelector(selectIsUserLogin)
  const getKey = useSelector(selectKey)
  const dispatch = useDispatch()
  const isNewUser = useSelector(selectNewUser)

  useEffect(() => {
    const init = async () => {
      try {
        const auth = new Web3Auth(WebBrowser, SecureStore, {
          clientId,
          network: OPENLOGIN_NETWORK.TESTNET,
        });
        dispatch(setWeb3Auth(auth));
        console.log(auth)
        await auth.init();
        if (auth?.privKey) {
          dispatch(setUserInfo(auth.userInfo()));
          dispatch(setKey(auth.privKey));
        }
      } catch (e) {
        throw e;
      }
    };
    init();
  }, []);

  // useEffect(() => {
  //   async function prepare(){
  //     Splash.preventAutoHideAsync()
  //   }
  //   prepare()
  // }, [])


  // else {
  //   Splash.hideAsync()
  // }

  return(
    <View style={tailwind`flex-1 justify-center`}>
      {isNewUser?
        <WelcomeQuestionsComponent />
        :
        <View style={styles.container}>
        { getKey?
              (
                <AuthenticatedUser />
              )
              :
              (
                <UnauthenticatedUser />
                )
              }
        </View>
        }
    </View>
  )
}

export default IsUserAvailable

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
});