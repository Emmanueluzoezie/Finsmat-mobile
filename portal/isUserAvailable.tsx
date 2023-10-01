import React, { useEffect } from 'react';
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

const clientId = process.env.WEB3AUTH_CLIENT_ID

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

  return(
    <View style={tailwind`flex-1`}>
      {isNewUser?
        <WelcomeQuestionsComponent />
        :
        <View style={styles.container}>
            {getKey ?
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