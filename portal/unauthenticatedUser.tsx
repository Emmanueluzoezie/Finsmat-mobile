import React, { useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme} from '../slice/AppSlices'
import { LOGIN_PROVIDER } from "@web3auth/react-native-sdk";
import tailwind from 'twrnc'
import { appColor } from '../component/AppColor'
import { Keypair } from '@solana/web3.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SignupWIthEmail from '../component/SignupWIthEmail'
import { solanaAddress } from '../utilies/solana'
import { selectWeb3Auth, setConsole, setKey, setUserInfo } from '../slice/userSlice'
import { useQuery } from '@apollo/client';
import { GET_ALL_USER } from '../graphql/queries';


const scheme = 'calbuild';
const resolvedRedirectUrl = `${scheme}://web3auth`

const UnauthenticatedUser = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const appTheme = useSelector(selectAppTheme)
  const web3auth = useSelector(selectWeb3Auth)
  const dispatch = useDispatch()
  const { data, loading, error } = useQuery(GET_ALL_USER)

  const bgColor = appTheme === "dark"? appColor.darkBackground : appColor.lightBackground

  const textColor = appTheme === "dark"? appColor.darkTextColor : appColor.lightTextColor

  const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

  const login = async (provider) => {
    try {
      dispatch(setConsole("Logging in"))
      await web3auth.login({
        loginProvider: provider,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "none",
        curve: "secp256k1",
      });

      if (web3auth.privKey) {
        dispatch(setUserInfo(web3auth.userInfo()));
        dispatch(setKey(web3auth.privKey));

        // Create a new Solana address
        if (data) {
          const alreadyExist = data.getUserList && data.getUserList.some((user) => user.email === web3auth.userInfo().email);

          if (alreadyExist) {
            return;
          }
          else{
            await solanaAddress()
          }
        }
      }
    } catch (e) {
      setErrorMessage("Oops, something went wrong while signing in. Please check your internet connection and try again")
    }
  };

  return (
      <View style={[
        styles.container,
        {backgroundColor: bgColor}
        ]}>
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={tailwind`flex-1`}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[{ zIndex: 1, flex: 1, paddingBottom: 10 }]}
          >
           {errorMessage &&
            <View style={tailwind`absolute top-[150px] w-full px-4`}>
              <View style={[tailwind`px-4 py-2 rounded-md`, { backgroundColor: appColor.errorColor }]}>
                <Text style={[tailwind`font-bold`, { color: "white" }]}>{errorMessage}</Text>
              </View>
            </View>
           }
            <View style={[tailwind`flex-1 justify-center`]}>
              <View style={[tailwind`px-4`]}>
                <View style={[tailwind`py-3`]}>
                  <TouchableOpacity onPress={() => login(LOGIN_PROVIDER.GOOGLE)}>
                      <View style={[
                    tailwind`flex-row justify-center items-center p-3 rounded-md`,
                        {backgroundColor: containerColor}
                        ]}>
                    <Text style={[tailwind`font-semibold  pr-2`,
                      { color: textColor , letterSpacing: 0.6 }
                        ]}>Sign up with</Text>
                        <Image source={require("../assets/google.png")} style={[tailwind`w-4 h-4`]} />
                    <Text style={[tailwind`font-semibold pl-[2px]`,
                          {color: textColor , letterSpacing: 0.6}
                        ]}>oogle</Text>
                      </View>
                  </TouchableOpacity>
                </View>
              <View style={[tailwind`py-3`]}>
                <TouchableOpacity onPress={() => login(LOGIN_PROVIDER.FACEBOOK)}>
                    <View style={[
                      tailwind`flex-row justify-center items-center p-3 rounded-md`,
                      {backgroundColor: containerColor}
                      ]}>
                    <Text style={[tailwind`font-semibold pr-1`,
                        {color: textColor , letterSpacing: 0.6}
                      ]}>Sign up with</Text>
                      <Image source={require("../assets/facebook.png")} style={[tailwind`w-[10px] h-[16px]`]} />
                    <Text style={[tailwind`font-semibold pl-[1px]`,
                        {color: textColor , letterSpacing: 0.6}
                      ]}>acebook</Text>
                    </View>
                </TouchableOpacity>
              </View>
              <View style={[tailwind`py-3`]}>
                <TouchableOpacity onPress={() => login(LOGIN_PROVIDER.TWITTER)}>
                    <View style={[
                    tailwind`flex-row justify-center items-center p-3 rounded-md`,
                      {backgroundColor: containerColor}
                      ]}>
                    <Text style={[tailwind`font-semibold  pr-1`,
                        {color: textColor , letterSpacing: 0.6}
                      ]}>Sign up with</Text>
                      {appTheme === "dark"?
                        <Image source={require("../assets/xcom.png")} style={[tailwind`w-3 h-3`]} />
                        :
                        <Image source={require("../assets/lightx.png")} style={[tailwind`w-3 h-3`]} />
                      }
                      <Text style={[tailwind`font-semibold`,
                        {color: textColor , letterSpacing: 0.6}
                      ]}>(Twitter)</Text>
                    </View>
                </TouchableOpacity>
              </View>

                <SignupWIthEmail />
              </View>
            </View>
          </KeyboardAvoidingView>
      </TouchableOpacity>
    </View>
  )
}

export default UnauthenticatedUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    position: "relative"
  }
})