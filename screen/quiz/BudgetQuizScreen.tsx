import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { useNavigation, useRoute } from '@react-navigation/native'
import { appColor } from '../../component/AppColor'
import tailwind from 'twrnc'
import HeaderWithTwoItems from '../../component/HeaderWithTwoItems'
import { MaterialIcons } from '@expo/vector-icons'
import SingleQuizComponent from '../../component/quiz/SingleQuizComponent'
import ResultComponent from '../../component/ResultComponent'
import { resetAnsweredQuestions, selectAnswerQuestions } from '../../slice/QuizSlice'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_QUESTION_BY_TYPE, GET_USER_BY_EMAIL } from '../../graphql/queries'
import QuizLoadingComponent from '../../component/quiz/QuizLoadingComponent'
import { selectUserId, selectUserInfo } from '../../slice/userSlice'
import { UPDATE_POINTS } from '../../graphql/mutations'
import ResultParentComponent from '../../component/ResultParentComponent'

const BudgetQuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResultComponent, setShowResultComponent] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)
  const [startQuiz, setStartQuiz] = useState(false)
  const [remainingTime, setRemainingTime] = useState(300);
  const [currentQuestion, setCurrentQuestion] = useState<any>()
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()
  const [percentage, setPercentage] = useState(0)
  const route = useRoute().name

  const {data, loading, error}= useQuery(GET_ALL_QUESTION_BY_TYPE, {
    variables:{
      question_type: "Budget"
    }
  })

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const questions = data?.getQuestionsByType?.slice(0, 5)

  const handleStartQuiz = () => {
    setStartQuiz(true)
    setRemainingTime(120);
    setShowResultComponent(false);

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setShowResultComponent(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };


  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (showInstruction === true) {
        setShowInstruction(false)
      }
    } else {
      setShowResultComponent(true)
    }
  };

  useEffect(() => {
    if (questions && currentQuestionIndex !== undefined && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const totalQuestions = questions.length;
      const eachQuestionPercent = 100 / totalQuestions;
      const percentage = (currentQuestionIndex + 1) * eachQuestionPercent;
      setCurrentQuestion(currentQuestion)
      setPercentage(percentage);
    }
  }, [currentQuestionIndex, data])

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <View style={[
      tailwind`flex-1`,
      { backgroundColor: bgColor }
    ]}>
      {loading ?
        <QuizLoadingComponent />
        :
        error ?
          <View style={[tailwind`flex-1 justify-center items-center`,]}>
            <Text style={[tailwind`text-[16px]`, { color, fontFamily: "Lato-Bold" }]}>Oops! An error occur in our end. Check your internet connection and try again</Text>
            <TouchableOpacity style={[tailwind`justify-center items-center px-4 mt-6 py-2 rounded-md`, { backgroundColor: buttonColor }]} onPress={() => navigation.goBack()}>
              <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>Click to reload</Text>
            </TouchableOpacity>
          </View>
        :
        <View style={tailwind`flex-1`}>
          {showResultComponent ?
            <ResultParentComponent questions={questions} questionType={route}/>
            :
            <View style={tailwind`flex-1`}>
              <View style={[tailwind`flex-row items-center pt-10 pb-3 px-3 pr-10`, { backgroundColor: containerColor }]}>
                <HeaderWithTwoItems
                  Icon={MaterialIcons}
                  name="chevron-left"
                  onPress={() => navigation.goBack()}
                  title="Budget quiz"
                  size={30}
                />
              </View>

              {!startQuiz ?
                <View style={tailwind`flex-1 justify-center`}>
                  <Text style={[tailwind`pt-4 px-3 text-[16px] text-center mt-[-100px]`, { color, fontFamily: 'Lato-Regular' }]}>You have 2 mins to answer five Questions, and your time start immediately you click on the start quiz button. please read the question and your selected answer carefully. Once you click Next button, you will not be able to return to the previous question. and make sure you click on the next button after answering the question before the time runs out</Text>
                  <View style={[tailwind`px-10 mt-10`]}>
                    <TouchableOpacity style={[tailwind`justify-center items-center py-2 rounded-md`, { backgroundColor: buttonColor }]} onPress={handleStartQuiz}>
                      <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>Start Quiz</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                :
                <View style={tailwind`flex-1`}>
                  <View style={tailwind`p-4`}>
                    <View style={[
                      tailwind`h-3 w-full rounded-full`,
                      { backgroundColor: containerColor }
                    ]}>
                      <View
                        style={[
                          tailwind`rounded-full h-3`,
                          { width: `${percentage}%`, backgroundColor: buttonColor },
                        ]}
                      />
                    </View>
                    <Text style={[tailwind`text-center mt-2 font-bold`, { color, fontFamily: 'Lato-Bold' }]}> Question {currentQuestionIndex + 1} out {questions?.length} questions</Text>
                  </View>
                  <View style={[tailwind`absolute right-4 top-[60px]`]}>
                    <Text style={[tailwind` font-bold`, { color: buttonColor, fontFamily: 'Lato-Bold' }]}>Time Remaining</Text>
                    <View style={tailwind`items-center`}>
                      <View style={[tailwind`w-[50px] h-[50px] rounded-full justify-center items-center  border-[6px]`, { borderColor: buttonColor }]}>
                        <Text style={[tailwind` font-extrabold`, { color: buttonColor, fontFamily: 'Lato-Bold' }]}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                      </View>
                    </View>
                  </View>
                  <SingleQuizComponent
                    answerOne={currentQuestion?.answer_a}
                    answerTwo={currentQuestion?.answer_b}
                    answerThree={currentQuestion?.answer_c}
                    question={currentQuestion?.question}
                    correctAnswer={currentQuestion?.correct_answer}
                    handleNext={handleNext}
                    id={currentQuestion?.id}
                  />
                </View>
              }
            </View>
          }
        </View>
      }
    </View>
  )
}

export default BudgetQuizScreen

const styles = StyleSheet.create({})