import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import { Video } from 'expo-av'
import { selectAppTheme, setNewUser } from '../slice/AppSlices'
import { useDispatch, useSelector } from 'react-redux'
import { selectedCurrencyInfo, selectNameOfItem, selectWelcomeAmount } from '../slice/welcomeSlice'
import { appColor } from './AppColor'
import { gifImage, hashTagWord } from '../utilies/WelcomeArrayItems'
import { Ionicons } from '@expo/vector-icons'



const WelcomeResult = () => {
    const appTheme = useSelector(selectAppTheme);
    const welcomeAmount = useSelector(selectWelcomeAmount);
    const userTreatItem = useSelector(selectNameOfItem);
    const getCurrencyInfo = useSelector(selectedCurrencyInfo)
    const dispatch = useDispatch()

    const amount: number = (Number(welcomeAmount) / 2) * 365;
    const oneYearReturn: string = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fiveYearReturn: string = (amount * 5).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
 
    function getRandomGif() {
        const randomIndex = Math.floor(Math.random() * gifImage.length);
        return gifImage[randomIndex];
    }

    function getHashTag() {
        const hashIndex = Math.floor(Math.random() * hashTagWord.length);
        return hashTagWord[hashIndex];
    }  

    const randomGif = getRandomGif(); 
    const hashword = getHashTag(); 

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <View style={tailwind`flex-1 relative`}>
        <View style={tailwind`flex-row flex-col mt-10 justify-center items-center`}>
            <View style={[
                  tailwind`p-2 px-6 mb-4 font-bold rounded-lg flex-row items-center`,
                  { backgroundColor: buttonColor }
            ]}>
                <Ionicons name="checkmark-circle" size={20} color={bgColor} />
                  <Text style={[
                      tailwind`text-[15px] pl-5 font-bold`,
                      { color: bgColor, }
                  ]}>You have been rewarded 20 Coins</Text>
            </View>
            <Image
                source={{ uri: randomGif }}
                style={{ width: 300, height: 300 }}
            />
              <View style={tailwind`p-4 mt-4 `}>
                  <View style={[tailwind`p-5 rounded-md`, { backgroundColor: containerColor }]}>
                      <Text style={[
                          tailwind`text-[15px] text-center`,
                          { color: textColor, fontWeight: "500" }
                      ]}>Imagine that if you saved just half of the {getCurrencyInfo.symbol}{welcomeAmount} you spend on {userTreatItem} every day, you could have built up a substantial savings. In one year, you will get</Text>
                      <Text style={[tailwind`text-[14px] text-center font-bold`, { color: textColor }
                      ]}>{getCurrencyInfo.symbol}{oneYearReturn}</Text>
                      <Text style={[tailwind`text-[15px] text-center`,{ color: textColor }
                      ]}>In five year, you will get</Text>
                      <Text style={[tailwind`text-[14px] text-center font-bold`, { color: textColor }
                      ]}>{getCurrencyInfo.symbol}{fiveYearReturn}</Text>
                      <Text style={tailwind`font-semibold`}></Text>
                      <Text style={[
                          tailwind`text-[16px] font-bold text-center mt-5`,
                          {color: textColor}
                      ]}>#{hashword}</Text>
                  </View>
              </View>
            <View style={{ zIndex: 20 }}>
            <TouchableOpacity style={[tailwind`py-2 my-4 rounded-md`,
            {
                backgroundColor: buttonColor,
            }]}
                onPress={() => dispatch(setNewUser(false))}
            >
                <Text style={[
                    tailwind` text-center font-bold text-[18px] px-[100px]`,
                    { color: bgColor }
                ]}>Get your coin</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default WelcomeResult
 
const styles = StyleSheet.create({})