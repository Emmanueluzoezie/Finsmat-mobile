import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { selectWeb3Auth, setConsole, setKey, setUserInfo } from '../slice/AppSlices'

const HomeScreen = () => {
  const web3auth = useSelector(selectWeb3Auth)
  const dispatch = useDispatch()

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
    <View style={[tailwind`flex-1 justify-center`]}>
      <Text>HomeScreen</Text>
      {/* <TouchableWithoutFeedback onPress={() => logout()}>
        <View style={[
          tailwind`flex-row justify-center items-center p-3 rounded-md`,
          { backgroundColor: "red" }
        ]}>
          <Text style={[tailwind`font-semibold  pr-2`,
          { color: "black", letterSpacing: 0.6 }
          ]}>Logout</Text>
        </View>
      </TouchableWithoutFeedback> */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})