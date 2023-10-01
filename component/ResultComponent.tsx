import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetAnsweredQuestions, selectAnswerQuestions } from '../slice/QuizSlice'
import tailwind from 'twrnc'
import HeaderWithTwoItems from './HeaderWithTwoItems'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { ScrollView } from 'react-native-gesture-handler'

const ResultComponent = ({question, correctAnswer}) => {
    const navigation = useNavigation()
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <ScrollView>
        <View style={tailwind`p-3`}>
            <View style={[tailwind`p-3 rounded-md`,
            { backgroundColor: containerColor }]}>
                <Text style={[tailwind`text-[15px] font-semibold`, { color }]}>{question}</Text>
                <Text style={[tailwind`text-[13px] pt-2`, { color }]}>{correctAnswer}</Text>
            </View>
        </View>
    </ScrollView>
  )
}

export default ResultComponent

const styles = StyleSheet.create({})