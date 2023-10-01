import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { selectAppTheme } from '../../slice/AppSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { appColor } from '../AppColor'
import tailwind from 'twrnc'
import { addAnsweredQuestions } from '../../slice/QuizSlice'

const SingleQuizComponent = ({ answerOne, answerTwo, answerThree, question, id,  correctAnswer, handleNext }) => {
    const appTheme = useSelector(selectAppTheme)
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const dispatch = useDispatch()

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const mainAppColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const handleClick = (answer) => {
        setSelectedAnswer(answer)
    }

    const handleNextQuestion = () => {
        const isCorrect = selectedAnswer === correctAnswer? true : false
        dispatch(addAnsweredQuestions({ 
            question: question, 
            correctAnswer: correctAnswer,
            isCorrect: isCorrect,
            id: id,
        }));
        handleNext()
    };

  return (
    <View style={[tailwind`flex-1 pt-[80px] relative`]}>
          <View style={[tailwind`w-full px-4`]}>
              <Text style={[
                  tailwind`text-[15px]`,
                  {color}
              ]}>{question}</Text>
            <View style={[tailwind`mt-4`]}>
                <TouchableOpacity style={[
                    tailwind`my-2 flex-row items-center p-3 rounded-md`, 
                      selectedAnswer === answerOne &&
                          { backgroundColor: mainAppColor }
                ]}
                onPress={() => handleClick(answerOne)}
                >
                    <View style={[
                    tailwind` w-5 h-5 rounded-full`,
                    selectedAnswer === answerOne?
                        { borderColor: bgColor, borderWidth: 4 }
                        :
                        { borderColor: mainAppColor, borderWidth: 2}
                ]} />
                    <Text style={[
                          tailwind`px-4 text-[15px]`,
                          selectedAnswer === answerOne ?
                              { color: bgColor, fontWeight: "700" }
                              :
                              { color: color }
                      ]}>{answerOne}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[
                    tailwind`my-2 flex-row items-center p-3 rounded-md`,
                      selectedAnswer === answerTwo &&
                      { backgroundColor: mainAppColor }
                ]}
                onPress={() => handleClick(answerTwo)}
                >
                    <View style={[
                    tailwind`w-5 h-5 rounded-full`,
                    selectedAnswer === answerTwo?
                        { borderColor: bgColor, borderWidth: 4 }
                        :
                        { borderColor: mainAppColor, borderWidth: 2}
                ]} />
                    <Text style={[
                          tailwind`text-center pl-4 text-[15px]`,
                          selectedAnswer === answerTwo ?
                              { color: bgColor, fontWeight: "700" }
                              :
                              { color: color }
                      ]}>{answerTwo}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[
                    tailwind`my-2  flex-row items-center p-3 rounded-md`,
                    selectedAnswer === answerThree && 
                    { backgroundColor: mainAppColor }
                ]}
                onPress={() => handleClick(answerThree)}
                >
                    <View style={[
                    tailwind` w-5 h-5 rounded-full`,
                    selectedAnswer === answerThree ?
                        { borderColor: bgColor, borderWidth: 4 }
                        :
                        { borderColor: mainAppColor, borderWidth: 2 }
                    ]} />
                    <Text style={[
                          tailwind`text-center pl-4 text-[15px]`,
                          selectedAnswer === answerThree ?
                              { color: bgColor, fontWeight: "700" }
                              :
                              { color: color }
                      ]}>{answerThree}</Text>
                </TouchableOpacity>
            </View>
        </View>
        {selectedAnswer &&
              <View style={tailwind`absolute bottom-20 px-4 w-full`}>
                  <TouchableOpacity style={[
                      tailwind`py-2 rounded-md`,
                      { backgroundColor: mainAppColor }
                  ]} onPress={handleNextQuestion}>
                      <Text style={[
                          tailwind`font-bold text-[16px] capitalize text-center`,
                          { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor }
                      ]}>Next</Text>
                  </TouchableOpacity>
            </View>
        }
    </View>
  )
}

export default SingleQuizComponent

const styles = StyleSheet.create({})