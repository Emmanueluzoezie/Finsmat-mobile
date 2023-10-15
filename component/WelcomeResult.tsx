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
                  tailwind`p-2 px-2 mb-4 font-bold rounded-lg flex-row items-center`,
            ]}>
                {/* <Ionicons name="checkmark-circle" size={20} color={bgColor} /> */}
            </View>
            <Image
                  source={{ uri: "https://media4.giphy.com/media/j0A8PCnlz49qt1BWCD/giphy.gif" }}
                style={{ width: 300, height: 300 }}
            />
              <View style={tailwind`p-4 mt-4 `}>
                  <View style={[tailwind`p-5 rounded-md`, ]}>
                      <Text style={[
                          tailwind`text-[20px] text-center`,
                          { color: color, fontFamily:  "Lato-Bold" }
                      ]}>In one year you lost <Text style={[tailwind`text-[22px] text-center font-bold`, { color: appColor.primaryColor }
                      ]}>{getCurrencyInfo.symbol}{" "}{oneYearReturn}</Text> on {userTreatItem}.</Text>
                      
                      <Text style={[
                          tailwind`text-[30px] font-bold text-center mt-5`,
                          {color: color}
                      ]}>#{hashword}</Text>
                  </View>
              </View>
            <Text style={[tailwind`text-[18px] text-center px-3`,
                      { color: color, }
                  ]}>Congratulations, you have been rewarded <Text style={[tailwind``, { color: buttonColor, fontFamily: "Lato-Bold" }]}>20 Points</Text></Text>
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
                ]}>Get your point</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default WelcomeResult
 
const styles = StyleSheet.create({})