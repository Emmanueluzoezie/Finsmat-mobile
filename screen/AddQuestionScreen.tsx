import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from '../component/AppColor'
import tailwind from 'twrnc'
import HeaderWithTwoItems from '../component/HeaderWithTwoItems'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AddQuestionComponent from '../component/AddQuestionComponent'

const AddQuestionScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <View style={[
          tailwind`flex-1 pt-10`,
          { backgroundColor: bgColor }
      ]}>
        <View style={tailwind`flex-row`}>
            <HeaderWithTwoItems
                Icon={MaterialIcons}
                name="chevron-left"
                onPress={() => navigation.goBack()}
                title="Add question"
                size={30}
            />
        </View>
        <AddQuestionComponent />
    </View>
  )
}

export default AddQuestionScreen

const styles = StyleSheet.create({})