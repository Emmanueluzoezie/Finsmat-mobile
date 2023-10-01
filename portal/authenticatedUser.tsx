import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import ProfileScreen from '../screen/ProfileScreen'
import CalculatorScreen from '../screen/CalculatorScreen'
import DashBoardScreen from '../screen/dashboard_screens/DashBoardScreen'
import GoalScreen from '../screen/GoalScreen'
import LeaderShipBoardScreen from '../screen/LeaderShipBoardScreen'
import { useSelector } from 'react-redux'
import { selectNewUser } from "../slice/AppSlices"
import SettingScreen from '../screen/SettingScreen'
import ToolsScreen from '../screen/ToolsScreen'
import HistoryScreen from '../screen/HistoryScreen'
import QuizScreen from '../screen/quiz/QuizScreen'
import BudgetQuizScreen from '../screen/quiz/BudgetQuizScreen'
import SavingQuizscreen from '../screen/quiz/SavingQuizscreen'
import DailyQuizScreen from '../screen/quiz/DailyQuizScreen'
import CompoundQuizScreen from '../screen/quiz/CompoundQuizScreen'
import FriendsQuizScreen from '../screen/quiz/FriendsQuizScreen'
import InvestmentQuizScreen from '../screen/quiz/InvestmentQuizScreen'
import ArticleScreen from '../screen/ArticleScreen'

const Stack = createNativeStackNavigator()
const AuthenticatedUser = () => {
  const isUserNew = useSelector(selectNewUser)

  return (
    <View style={styles.container}>
      {/* {isUserNew?
      <WelcomeQuestionsComponent />
      : */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="home" component={DashBoardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="goal" component={GoalScreen} options={{ headerShown: false }} />
            <Stack.Screen name="leaderboard" component={LeaderShipBoardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="tools" component={ToolsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="settings" component={SettingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="quiz" component={QuizScreen} options={{ headerShown: false }} />
            <Stack.Screen name="calculator" component={CalculatorScreen} options={{ headerShown: false }} />
            <Stack.Screen name="history" component={HistoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="article" component={ArticleScreen} options={{ headerShown: false }} />

            {/* Quiz screen */}
            <Stack.Screen name="budget_quiz" component={BudgetQuizScreen} options={{ headerShown: false }} />
            <Stack.Screen name="savings_quiz" component={SavingQuizscreen} options={{ headerShown: false }} />
            <Stack.Screen name="daily_quiz" component={DailyQuizScreen} options={{ headerShown: false }} />
            <Stack.Screen name="compound_quiz" component={CompoundQuizScreen} options={{ headerShown: false }} />
            <Stack.Screen name="investment_quiz" component={InvestmentQuizScreen} options={{ headerShown: false }} />
            <Stack.Screen name="friends_quiz" component={FriendsQuizScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
     {/* } */}
    </View>
  )
}

export default AuthenticatedUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  }
})