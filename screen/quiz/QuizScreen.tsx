import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setCurrentScreen } from '../../slice/AppSlices'
import { useNavigation, useRoute } from '@react-navigation/native'
import tailwind from 'twrnc'
import { appColor } from '../../component/AppColor'
import { MaterialIcons } from '@expo/vector-icons'
import QuizComponent from '../../component/quiz/QuizComponent'
import HeaderWithTwoItems from '../../component/HeaderWithTwoItems'

const QuizScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute<RouteParams>();

  const previousScreen = route.params?.previousScreen;

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const handleBackButton = () => {
    dispatch(setCurrentScreen(previousScreen))
    navigation.goBack()
  }
  
  return (
    <View style={[
          tailwind`flex-1 pb-20`,
          { backgroundColor: bgColor }
      ]}>
      <View style={[tailwind`flex-row items-center pt-10 pb-3 px-3`, { backgroundColor: containerColor }]}>
        <HeaderWithTwoItems
          Icon={MaterialIcons}
          name="chevron-left"
          onPress={handleBackButton}
          title="Quiz"
          size={30}
        />
      </View>
      <QuizComponent />
    </View>
  )
}

export default QuizScreen

const styles = StyleSheet.create({})