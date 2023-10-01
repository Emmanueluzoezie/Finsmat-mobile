import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import tailwind from 'twrnc'

const HeaderComponent = ({ IconOne, IconTwo, nameOne, nameTwo, onPressOne, onPressTwo, title, sizeOne, sizeTwo }) => {
  const appTheme = useSelector(selectAppTheme)

  const color = appTheme === "dark"? appColor.darkTextColor: appColor.lightTextColor
    
  return (
    <View style={[tailwind`flex-row items-center flex-1`,]}>
      <IconOne name={nameOne} color={color} onPress={onPressOne} size={sizeOne} />
      <View style={[tailwind`flex-1 justify-center items-center text-lg `]}>
        <Text style={[tailwind`text-[20px] text-[${color}] capitalize font-bold`]}>{title}</Text>
      </View>
      <IconTwo name={nameTwo} color={color} onPress={onPressTwo} size={sizeTwo} />

    </View>
  )
}

export default HeaderComponent

const styles = StyleSheet.create({})