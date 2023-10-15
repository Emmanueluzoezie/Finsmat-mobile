import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import * as Clipboard from 'expo-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { appColor } from './AppColor';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USER, GET_USER_BY_EMAIL } from '../graphql/queries';
import { ADD_USER, ADD_USER_HISTORY } from '../graphql/mutations';
import { selectUserId, selectUserInfo, setUserId } from '../slice/userSlice';
import { Connection, PublicKey } from '@solana/web3.js';
import { SolanaWallet } from '@web3auth/solana-provider';

const DashBoardHeader = () => {
  const [solanaAddress, setSolanaAddress] = useState("")
  const [historyAdded, setHistoryAdded] = useState(false);
  const [copyMessage, setCopyMessage] = useState("")
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()
  const getUserInfo = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  // const provider = useSelector(selectP)

  const [addUserToDatabase] = useMutation(ADD_USER, {
    refetchQueries: [GET_ALL_USER, "getUserList"]
  })
  const [addHistoryToDatabase] = useMutation(ADD_USER_HISTORY)

  const { data, loading, error } = useQuery(GET_ALL_USER)
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: getUserInfo?.email
    }
  })

  if (loading || userLoading) {
    console.log("loading...")
  }
  
  if (userError) {   
    // console.log("errors:", error)   
    console.log("errors:", userError)   
  }

  const AddNewUser = async () => {
    const solanaAddress = await AsyncStorage.getItem('solana_address');
    const secretKey = await AsyncStorage.getItem('secret_key');

    try {
      if (!getUserInfo || solanaAddress === null || secretKey === null) return
  
      if (data) {
        const alreadyExist = data.getUserList && data.getUserList.some((user) => user.email === getUserInfo.email);
   
        if (alreadyExist) {
          return;
        }else{
          addUserToDatabase({
            variables: {
              email: getUserInfo.email,
              user_sol_address: solanaAddress,
              user_secret: secretKey,
              badge: "Novice",
              full_name: getUserInfo.name,
              image: getUserInfo.profileImage,
              created_at: new Date(),
              coins: 20,
              token: 0,
              isAdminUser: false
            },
          })
        }
      }
    } catch (error) {
    }
  };

  const markHistoryAddedFlag = async () => {
      await AsyncStorage.setItem('historyAdded', 'true');
  };

  const AddHistory = async () => {
    try {
      if (!historyAdded && userInfo) {
        const result = await addHistoryToDatabase({
          variables: {
            title: "Daily treat point",
            user_id: userInfo?.id,
            amount: userInfo?.coins,
            created_at: new Date(),
            descriptions: `You have been rewarded ${userInfo?.coins} for telling us your daily treat.`
          },
        });
        if (result.data) {
          markHistoryAddedFlag();
        }
      }
    } catch (err) {
    }
  };

  const checkHistoryAddedFlag = async () => {
      const historyFlag = await AsyncStorage.getItem('historyAdded');
      if (historyFlag !== 'true') {
        AddHistory()
      }
  };

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
  const container = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const textColor = appTheme === "dark"? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor
  
  const userInfo = userData?.getUserByEmail[0]

  useEffect(() => {
    AddNewUser();
    checkHistoryAddedFlag()

  }, [])

  useEffect(() => {
    if (userData) {
      dispatch(setUserId(userInfo?.id));
    }
  }, [userData])

    const copyToClipboard = async () => {
      await Clipboard.setStringAsync(userInfo.user_sol_address);
      setCopyMessage("copied")
      setTimeout(() => {
        setCopyMessage("")
      }, 2000)
    };

  return (
    <View style={tailwind`pt-10 relative`}>
      {loading || userLoading?
        <View style={tailwind`px-4 flex-row items-center`}>
          <View style={[tailwind`w-[32px] h-[32px] rounded-full`, { backgroundColor: container }]}/>
          <View style={tailwind`pl-4 flex-1`}>
            <View style={[tailwind`w-full h-[14px] mb-2`, { backgroundColor: container }]} />
            <View style={[tailwind`w-full h-[14px]`, { backgroundColor: container }]} />
          </View>
        </View>
        :
        <View>
          <View style={tailwind` flex-row items-center px-3`}>
            <TouchableOpacity style={tailwind` flex-1 flex-row items-center`}
              onPress={() => navigation.navigate("profile")
              }>
              <View style={[tailwind` rounded-full`, { backgroundColor: appColor.primaryDarkColor }]}>
                <Image source={{ uri: userInfo?.image }} style={tailwind`w-[32px] h-[32px] rounded-full`} />
              </View>
              <View style={tailwind`pl-2`}>
                <Text style={[
                  tailwind`text-[14px] pb-1 font-bold`,
                  { color, fontFamily: 'Lato-Bold' }]}
                  numberOfLines={1}
                  ellipsizeMode='tail'>{userInfo?.full_name}</Text>
                <View style={tailwind`flex-row w-[105px] `}>
                  <Text style={[tailwind`text-[12px]`,
                  { color: textColor, fontFamily: 'Lato-Regular' }]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >{userInfo?.user_sol_address}</Text>
                  <Ionicons name="copy" size={14} color={buttonColor} onPress={copyToClipboard} style={tailwind`pl-4`} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={[tailwind`flex-row justify-between items-center px-2 pl-10 `]}>
              <View style={tailwind` items-center`}>
                <Image source={require("../assets/investor.png")} style={tailwind`w-[15px] h-[15px]`} />
                <Text style={[
                  tailwind`pl-1 text-[12px] font-semibold capitalize`,
                  { color, fontFamily: 'Lato-Bold' }
                ]}>{userInfo?.badge}</Text>
              </View>
              <View style={tailwind`items-center pl-2`}>
                <Image source={require("../assets/coins.png")} style={tailwind`w-[15px] h-[12px]`} />
                <Text style={[
                  tailwind`pl-1 text-[11px] pt-1`,
                  { color, fontFamily: 'Lato-Bold' }
                ]}>{userInfo?.coins} Points</Text>
              </View>
              <View style={tailwind`items-center pl-2`}>
                <Text style={[
                  tailwind`pl-1 text-[12px] font-bold`,
                  { color, fontFamily: 'Lato-Bold' }
                ]}>Bal</Text>
                <Text style={[
                  tailwind`pl-1 text-[12px] font-bold`,
                  { color, fontFamily: 'Lato-Bold' }
                ]}>{userInfo?.token} SOL</Text>
              </View>
            </View>
          </View>
          <View style={[tailwind`font-semibold absolute w-full bottom-[-4]`]}>
            <Text style={[tailwind`font-semibold text-center text-[12px]`, { color: color }]}>{copyMessage}</Text>
          </View>
        </View>
      }
   </View>
  )
}

export default DashBoardHeader

const styles = StyleSheet.create({})