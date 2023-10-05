import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'

const LoadingAppComponent = () => {
  const appTheme = useSelector(selectAppTheme)

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor
  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor


  return (
    <View style={tailwind`justify-center flex-1 items-center`}>
      <ActivityIndicator size="large" color={buttonColor} />
    </View>
  )
}

export default LoadingAppComponent

const styles = StyleSheet.create({})