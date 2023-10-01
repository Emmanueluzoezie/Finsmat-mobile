import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import HeaderWithTwoItems from '../../component/HeaderWithTwoItems'
import tailwind from 'twrnc'
import { appColor } from '../../component/AppColor'
import { useNavigation } from '@react-navigation/native'
import { selectAppTheme } from '../../slice/AppSlices'
import { useDispatch, useSelector } from 'react-redux'
import SingleQuizComponent from '../../component/quiz/SingleQuizComponent'
import ResultComponent from '../../component/ResultComponent'
import { resetAnsweredQuestions, selectAnswerQuestions } from '../../slice/QuizSlice'

const FriendsQuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResultComponent, setShowResultComponent] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)
  const [startQuiz, setStartQuiz] = useState(false)
  const [remainingTime, setRemainingTime] = useState(300);
  const getUserResult = useSelector(selectAnswerQuestions)
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const correctAnswersCount = getUserResult.filter(question => question.isCorrect).length;
  const coinsToAward = correctAnswersCount * 10;

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const questions = [
    {
      question: 'What is the capital of France?',
      answerOne: 'Berlin',
      answerTwo: 'Paris',
      answerThree: 'Madrid',
      correctAnswer: 'Paris',
      id: 1
    },
    {
      question: 'What is 2 + 2?',
      answerOne: '3',
      answerTwo: '4',
      answerThree: '5',
      correctAnswer: '4',
      id: 2
    },
  ];

  const handleStartQuiz = () => {
    setStartQuiz(true)
    setRemainingTime(120);
    setShowResultComponent(false);

    // Start the countdown interval
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

  const handleBack = async () => {
    dispatch(resetAnsweredQuestions())
    navigation.goBack()
  }

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

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const eachQuestionPercent = 100 / totalQuestions;
  const percentage = (currentQuestionIndex + 1) * eachQuestionPercent;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemainingTime(prevTime => {
  //       if (prevTime <= 1) {
  //         clearInterval(interval);
  //         setShowResultComponent(true);
  //         return 0;
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <View style={[
      tailwind`flex-1`,
      { backgroundColor: bgColor }
    ]}>
      {showResultComponent ?
        <View style={[tailwind`flex-1`]}>
          <View style={[tailwind`flex-row items-center pt-10 pb-3 px-3 pr-10`, { backgroundColor: containerColor }]}>
            <HeaderWithTwoItems
              Icon={MaterialIcons}
              name="chevron-left"
              onPress={handleBack}
              title="Results"
              size={30}
            />
          </View>
          <View style={[tailwind`px-3 pt-6`]}>
            <Text style={[tailwind`text-center text-[16px] font-semibold`, { color }]}>You have been awarded won {coinsToAward} coins for answering {correctAnswersCount} questions correctly</Text>
          </View>
          <Text style={[tailwind`text-center text-[18px] mt-5 font-semibold`, { color }]}>
            Here are the answers
          </Text>
          <FlatList
            data={questions}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              < ResultComponent question={item.question} correctAnswer={item.correctAnswer} />
            )}
          />
          <View style={tailwind`absolute bottom-20 px-4 w-full`}>
            <TouchableOpacity style={[
              tailwind`py-2 rounded-md`,
              { backgroundColor: buttonColor }
            ]} onPress={handleBack}>
              <Text style={[
                tailwind`font-bold text-[16px] text-center`,
                { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor }
              ]}>Go to quiz session</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={tailwind`flex-1`}>
          <View style={[tailwind`flex-row items-center pt-10 pb-3 px-3 pr-10`, { backgroundColor: containerColor }]}>
            <HeaderWithTwoItems
              Icon={MaterialIcons}
              name="chevron-left"
              onPress={() => navigation.goBack()}
              title="Quiz  with friends"
              size={30}
            />
          </View>

          {!startQuiz ?
            <View style={tailwind`flex-1`}>
              <Text style={[tailwind`pt-4 px-3 text-[16px] text-center`, { color }]}>You have 2 mins to answer five Questions, and your time start immediately you click on the start quiz button. please read the question and your selected answer carefully. Once you click Next button, you will not be able to return to the previous question. and make sure you click on the next button after answering the question before the time runs out</Text>
              <View style={[tailwind`px-10 mt-10`]}>
                <TouchableOpacity style={[tailwind`justify-center items-center py-2 rounded-md`, { backgroundColor: buttonColor }]} onPress={handleStartQuiz}>
                  <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor }]}>Start Quiz</Text>
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
                <Text style={[tailwind`text-center mt-2 font-bold`, { color }]}> Question {currentQuestionIndex + 1} out {questions.length} questions</Text>
              </View>
              <View style={[tailwind`absolute right-4 top-[60px]`]}>
                <Text style={[tailwind` font-bold`, { color: buttonColor }]}>Time Remaining</Text>
                <View style={tailwind`items-center`}>
                  <View style={[tailwind`w-[50px] h-[50px] rounded-full justify-center items-center  border-[6px]`, { borderColor: buttonColor }]}>
                    <Text style={[tailwind` font-extrabold`, { color: buttonColor }]}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                  </View>
                </View>
              </View>
              <SingleQuizComponent
                answerOne={currentQuestion.answerOne}
                answerTwo={currentQuestion.answerTwo}
                answerThree={currentQuestion.answerThree}
                question={currentQuestion.question}
                correctAnswer={currentQuestion.correctAnswer}
                handleNext={handleNext}
                id={currentQuestion.id}
              />
            </View>
          }
        </View>
      }
    </View>
  )
}

export default FriendsQuizScreen

const styles = StyleSheet.create({})