import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'
import QuizNotification from '../dashboard/QuizNotification'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'

const QuizComponent = () => {
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const notificationColor = appTheme === "dark"? appColor.primaryDarkColor : appColor.primaryColor

  return (
    <View style={[tailwind`flex-1 pt-6 px-3`]}>
      <QuizNotification
        bgColor={containerColor}
        borderColor={notificationColor}
        color={color}
        onPress={() => navigation.navigate("daily_quiz")}
        title="Daily quiz"
        paragraph="Click to play now and get all question right to earn 50 coins. 10 coins for each."
        notification={false}
        />
      <QuizNotification
        bgColor={containerColor}
        borderColor={notificationColor}
        color={color}
        onPress={() => navigation.navigate("savings_quiz")}
        title="Saving quiz"
        paragraph="Click to play now and get all question right to earn 50 coins.  10 coins for each."
        notification={true}
        />
      <QuizNotification
        bgColor={containerColor}
        borderColor={notificationColor}
        color={color}
        onPress={() => navigation.navigate("budget_quiz")}
        title="Budget quiz"
        paragraph="Click to play now and get all question right to earn 50 coins. 10 coins for each."
        notification={false}
        />
      <QuizNotification
        bgColor={containerColor}
        borderColor={notificationColor}
        color={color}
        onPress={() => navigation.navigate("compound_quiz")}
        title="Compound quiz"
        paragraph="Click to play now and get all question right to earn 50 coins. 10 coins for each."
        notification={false}
        />
      <QuizNotification
        bgColor={containerColor}
        borderColor={notificationColor}
        color={color}
        onPress={() => navigation.navigate("investment_quiz")}
        title="Investment quiz"
        paragraph="Click to play now and get all question right to earn 50 coins. 10 coins for each."
        notification={true}
        />
      <QuizNotification
        bgColor={containerColor}
        borderColor={notificationColor}
        color={color}
        onPress={() => navigation.navigate("friends_quiz")}
        title="Quiz with friends"
        paragraph="Click to play and get all question right to earn 100 coins. 10 coins for each."
        notification={true}
        />
    </View>
  )
}

export default QuizComponent

const styles = StyleSheet.create({})