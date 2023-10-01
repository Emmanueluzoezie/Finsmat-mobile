import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { appColor } from '../AppColor'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'

const QuizNotification = ({bgColor, onPress, borderColor, title, paragraph, notification, color}) => {
  const appTheme = useSelector(selectAppTheme)

  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

  return (
    <TouchableOpacity style={[
        tailwind`p-3 my-[13px] flex-row items-center rounded-md border-l-[4px] shadow-lg`,
        {backgroundColor: bgColor, borderColor}
    ]} 
    onPress={onPress}
    >
      <View style={tailwind`flex-1`}>
            <Text style={[
                tailwind`text-[16px] font-semibold`,
                {color: color}
             ]}>{title}</Text>
            <Text style={[
                tailwind`mt-3 text-[14px] pr-4`,
          { color: textColor }
              ]}>{paragraph}</Text>
      </View>
        <TouchableOpacity style={[tailwind`w-[20px] justify-center items-center rounded-sm h-[20px] relative`]}>
        <MaterialIcons name="notifications" size={18} color={borderColor} />
              {notification &&
                <View style={tailwind`bg-[${appColor.ternaryColor}] w-2 h-2 rounded-full absolute right-[2px] top-[0]`}/>
              }
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default QuizNotification

const styles = StyleSheet.create({})