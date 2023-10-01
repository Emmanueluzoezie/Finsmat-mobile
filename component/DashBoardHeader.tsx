import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import * as Clipboard from 'expo-clipboard';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { appColor } from './AppColor';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USER, GET_USER_BY_EMAIL } from '../graphql/queries';
import { ADD_USER } from '../graphql/mutations';
import { selectUserInfo } from '../slice/userSlice';

const DashBoardHeader = () => {
  const [solanaAddress, setSolanaAddress] = useState("")
  const [copyMessage, setCopyMessage] = useState("")
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()
  const getUserInfo = useSelector(selectUserInfo)
  const [addUserToDatabase] = useMutation(ADD_USER, {
    refetchQueries: [GET_ALL_USER, "getUserList"]
  })

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
      if (!getUserInfo || solanaAddress === null || secretKey === null) {
        console.log(getUserInfo, "null")
        console.log(solanaAddress, "null")
        console.log(secretKey, "null")
        // return;
      }
  
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
              badge: "finance novice",
              full_name: getUserInfo.name,
              image: getUserInfo.profileImage,
              created_at: new Date(),
              coins: 20,
            },
          })
        }
      }
      console.log("added")
    } catch (error) {
      console.log("error:", error);
    }
  };


  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const textColor = appTheme === "dark"? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

  useEffect(() => {
    AddNewUser();
  }, []) 
  
  const userInfo = userData?.getUserByEmail[0]

    const copyToClipboard = async () => {
      await Clipboard.setStringAsync(userInfo.user_sol_address);
      setCopyMessage("copied")
      setTimeout(() => {
        setCopyMessage("")
      }, 2000)
    };

  return (
    <View style={tailwind`pt-12 relative`}>
      <View style={tailwind` flex-row items-center px-3`}>
        <TouchableOpacity style={tailwind` flex-1 flex-row items-center`} onPress={() => navigation.navigate("profile")}>
          <View style={[tailwind` rounded-full`, {backgroundColor: appColor.primaryDarkColor}]}>
            <Image source={{ uri: userInfo?.image }} style={tailwind`w-[32px] h-[32px] rounded-full`} />
          </View>
          <View style={tailwind`pl-2`}>
            <Text style={[
              tailwind`text-[14px] pb-1 font-bold`, 
              {color, }]}
              numberOfLines={1}
              ellipsizeMode='tail'>{userInfo?.full_name}</Text>
            <View style={tailwind`flex-row w-[105px] `}>
              <Text style={[tailwind`text-[12px]`,
                { color: textColor }]}
                numberOfLines={1}
                ellipsizeMode='tail'
              >{userInfo?.user_sol_address}</Text>
              <Ionicons name="copy" size={14} color={buttonColor} onPress={copyToClipboard} style={tailwind`pl-4`} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={[tailwind`flex-row justify-between items-center px-2 pl-10 `]}>
          <View style={tailwind` items-center`}>
            <Image source={require("../assets/investor.png")} style={tailwind`w-[15px] h-[15px]`}/>
           <Text style={[
            tailwind`pl-1 text-[12px] font-semibold capitalize`,
            {color}
           ]}>{userInfo?.badge}</Text>
          </View>
          <View style={tailwind`items-center pl-2`}>
            <Image source={require("../assets/coins.png")} style={tailwind`w-[15px] h-[12px]`} />
            <Text style={[
              tailwind`pl-1 text-[12px] font-bold`,
              {color}
            ]}>{userInfo?.coins}</Text>
          </View>
        </View>
      </View>
      <View style={[tailwind`font-semibold absolute w-full bottom-[-4]`]}>
        <Text style={[tailwind`font-semibold text-center text-[12px]`, {color: color}]}>{copyMessage}</Text>
      </View>
   </View>
  )
}

export default DashBoardHeader

const styles = StyleSheet.create({})