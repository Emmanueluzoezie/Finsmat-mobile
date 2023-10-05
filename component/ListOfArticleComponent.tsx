import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { FontAwesome } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, selectCurrentArticleScreen, setCurrentArticleScreen } from '../slice/AppSlices'
import { appColor } from './AppColor'

const ListOfArticleComponent = () => {
    const appTheme = useSelector(selectAppTheme)
    const articleScreen = useSelector(selectCurrentArticleScreen)
    const dispatch = useDispatch()

    const handleSelectScreen = (screen) => {
        dispatch(setCurrentArticleScreen(screen))
    }

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const screenBgColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const screenColor = appTheme === "dark"? appColor.lightTextColor : appColor.darkTextColor
    // const savedColor = articleScreen === "saved" ? screenColor: textColor
    // const savedColor = articleScreen === "saved" ? screenColor: textColor
    // const savedColor = articleScreen === "saved" ? screenColor: textColor
  return (
      <ScrollView horizontal style={tailwind`py-2`}>
          <TouchableOpacity style={[tailwind`flex-row items-center py-1 mr-1 px-2 rounded-md`, articleScreen === "saved" ?
              { backgroundColor: screenBgColor } : { borderWidth: 1, borderColor: textColor }]}
          onPress={() => handleSelectScreen("saved")}>
              <FontAwesome name="bookmark" size={12} color={articleScreen === "saved"?  screenColor: textColor } />
              <Text style={[tailwind`text-[12px] pl-[4px] font-bold`, { fontFamily: 'Lato-Bold' },
                  articleScreen === "saved" ? { color: screenColor}:{ color: textColor }
                ]}>Saved</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={[tailwind` py-1 mx-1 px-2 rounded-md`, articleScreen === "latest_article" ? { backgroundColor: screenBgColor } : { borderWidth: 1, borderColor: textColor }]}
              onPress={() => handleSelectScreen("latest_article")}>
              <Text style={[tailwind`text-[12px] capitalize font-semibold`, { fontFamily: 'Lato-Bold' }, articleScreen === "latest_article" ? { color: screenColor } : { color: textColor }
              ]}>latest article</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[tailwind` py-1 mx-1 px-2 rounded-md`, articleScreen === "traditional_article" ? { backgroundColor: screenBgColor } : { borderWidth: 1, borderColor: textColor }]}
              onPress={() => handleSelectScreen("traditional_article")}>
              <Text style={[tailwind`text-[12px] pl-[4px] capitalize font-bold`, { fontFamily: 'Lato-Bold' }, articleScreen === "traditional_article" ? { color: screenColor } : { color: textColor }]}>traditional finance article</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[tailwind` py-1 mx-1 px-2 rounded-md`, articleScreen === "crypto_article" ? { backgroundColor: screenBgColor } : { borderWidth: 1, borderColor: textColor }]}
              onPress={() => handleSelectScreen("crypto_article")}>
              <Text style={[tailwind`text-[12px] pl-[4px] capitalize font-bold`, { fontFamily: 'Lato-Bold' }, articleScreen === "crypto_article" ? { color: screenColor } : { color: textColor }]}>Crypto finance article</Text>
          </TouchableOpacity>
      </ScrollView>
  )
}

export default ListOfArticleComponent

const styles = StyleSheet.create({})