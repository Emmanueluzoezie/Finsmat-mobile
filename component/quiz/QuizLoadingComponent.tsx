import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { appColor } from '../AppColor'

const QuizLoadingComponent = () => {
    const appTheme = useSelector(selectAppTheme)

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor
    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor


  return (
    <View style={tailwind`justify-center flex-1 items-center`}>
      <Text style={[tailwind`font-bold text-xl pb-2`, { color, fontFamily: 'Lato-Bold' }]}>Loading Questions</Text>
          <ActivityIndicator size="large" color={buttonColor} />
    </View>
  )
}

export default QuizLoadingComponent

const styles = StyleSheet.create({})