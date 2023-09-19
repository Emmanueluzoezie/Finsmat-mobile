import React from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, selectWeb3Auth, setConsole, setKey, setUserInfo } from '../slice/AppSlices'
import { LOGIN_PROVIDER } from "@web3auth/react-native-sdk";
import tailwind from 'twrnc'
import { appColor } from '../component/AppColor'
import { Keypair } from '@solana/web3.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SignupWIthEmail from '../component/SignupWIthEmail'
import { solanaAddress } from '../utilies/solana'


const scheme = 'calbuild';
const resolvedRedirectUrl = `${scheme}://web3auth`

const UnauthenticatedUser = () => {
  const appTheme = useSelector(selectAppTheme)
  const web3auth = useSelector(selectWeb3Auth)
  const dispatch = useDispatch()

  const bgColor = appTheme === "dark"? appColor.darkBackground : appColor.lightBackground

  const textColor = appTheme === "dark"? appColor.darkTextColor : appColor.lightTextColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

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
        await solanaAddress()
      }
    } catch (e) {
      throw e;
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
            <View style={[tailwind`flex-1 justify-center`]}>
              <View style={[tailwind`px-4`]}>
                <View style={[tailwind`py-3`]}>
                  <TouchableWithoutFeedback onPress={() => login(LOGIN_PROVIDER.GOOGLE)}>
                      <View style={[
                    tailwind`flex-row justify-center items-center p-3 rounded-md`,
                        {backgroundColor: containerColor}
                        ]}>
                    <Text style={[tailwind`font-semibold  pr-2`,
                      { color: textColor , letterSpacing: 0.6 }
                        ]}>Sign up with</Text>
                        <Image source={require("../assets/google.png")} style={[tailwind`w-5 h-5`]} />
                    <Text style={[tailwind`font-semibold`,
                          {color: textColor , letterSpacing: 0.6}
                        ]}>oogle</Text>
                      </View>
                  </TouchableWithoutFeedback>
                </View>
              <View style={[tailwind`py-3`]}>
                <TouchableWithoutFeedback onPress={() => login(LOGIN_PROVIDER.FACEBOOK)}>
                    <View style={[
                      tailwind`flex-row justify-center items-center p-3 rounded-md`,
                      {backgroundColor: containerColor}
                      ]}>
                    <Text style={[tailwind`font-semibold pr-1`,
                        {color: textColor , letterSpacing: 0.6}
                      ]}>Sign up with</Text>
                      <Image source={require("../assets/facebook.png")} style={[tailwind`w-3 h-5`]} />
                    <Text style={[tailwind`font-semibold pl-[1px]`,
                        {color: textColor , letterSpacing: 0.6}
                      ]}>acebook</Text>
                    </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={[tailwind`py-3`]}>
                <TouchableWithoutFeedback onPress={() => login(LOGIN_PROVIDER.TWITTER)}>
                    <View style={[
                    tailwind`flex-row justify-center items-center p-3 rounded-md`,
                      {backgroundColor: containerColor}
                      ]}>
                    <Text style={[tailwind`font-semibold  pr-1`,
                        {color: textColor , letterSpacing: 0.6}
                      ]}>Sign up with</Text>
                      {appTheme === "dark"?
                        <Image source={require("../assets/xcom.png")} style={[tailwind`w-5 h-5`]} />
                        :
                        <Image source={require("../assets/lightx.png")} style={[tailwind`w-5 h-5`]} />
                      }
                      <Text style={[tailwind`font-semibold`,
                        {color: textColor , letterSpacing: 0.6}
                      ]}>(Twitter)</Text>
                    </View>
                </TouchableWithoutFeedback>
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
  }
})