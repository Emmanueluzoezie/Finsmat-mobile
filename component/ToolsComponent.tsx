import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from './AppColor'
import { selectAppTheme } from '../slice/AppSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const ToolsComponent = () => {
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
      <View style={tailwind`flex-1 pb-4 px-3`}>
          <TouchableOpacity style={[
              tailwind`pl-3 py-4 my-1 mt-2 rounded-md flex-row items-center`,
              { backgroundColor: containerColor, borderColor: bgColor }
          ]}
              onPress={() => navigation.navigate("calculator")}>
              <View style={tailwind`flex-1`}>
                <Text style={[tailwind`text-[16px] font-semibold`, { color }]}>Calculators</Text>
                <Text style={[tailwind`text-[13px] pt-1`, { color }]}>Investment and compound calculator</Text>
              </View>

              <MaterialIcons name="chevron-right" size={30} color={color} />
          </TouchableOpacity>
          <TouchableOpacity style={[
              tailwind`pl-3 py-4 my-1 mt-2 rounded-md  flex-row items-center`,
              { backgroundColor: containerColor, borderColor: bgColor }
          ]}
              onPress={() => navigation.navigate("article")}>
             <View style={tailwind`flex-1`}>
                  <Text style={[tailwind`text-[16px] font-semibold`, { color }]}>Explore Finance Articles</Text>
                  <Text style={[tailwind`text-[13px] pt-1`, { color }]}>Enhance your financial knowledge by delving into finance articles</Text>
             </View>
              <MaterialIcons name="chevron-right" size={30} color={color} />
          </TouchableOpacity>
      </View>
  )
}

export default ToolsComponent

const styles = StyleSheet.create({})