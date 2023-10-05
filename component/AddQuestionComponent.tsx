import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { useNavigation } from '@react-navigation/native'
import { appColor } from './AppColor'
import { Formik } from 'formik'
import * as yup from 'yup'
import { MaterialIcons } from '@expo/vector-icons'
import { questionsLevelType, questionsType } from '../utilies/AppObjects'

const questionValidation = yup.object().shape({
  question: yup
    .string()
    .required('Question is required'),
  answer_one: yup
    .string()
    .required('Answer One is required'),
  answer_two: yup
    .string()
    .required('Answer Two is required'),
  answer_three: yup
    .string()
    .required('Answer Three is required'),
  correct_answer: yup
    .string()
    .required('Correct Answer is required')
})

const AddQuestionComponent = () => {
  const [showQuestionType, setShowQuestionType] = useState(false)
  const [question, setQuestion] = useState("Saving")
  const [showQuestionLevel, setShowQuestionLevel] = useState(false)
  const [questionLevel, setQuestionLevel] = useState("Beginner")
  const appTheme = useSelector(selectAppTheme)
  const navigation = useNavigation()

  // questionsType

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

  const inputBgColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.inputLightBgColor

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor


  const handleQuestion = (item) => {
    setQuestion(item)
    setShowQuestionType(false)
  }

  const handleQuestionLevel = (item) => {
    setQuestionLevel(item)
    setShowQuestionLevel(false)
  }

  const closeActiveState = () => {
    if(showQuestionType){
      setShowQuestionType(false)
    }
    Keyboard.dismiss()

  }

  const formQuestion = (value) => {

  }


  return (
    <TouchableOpacity style={tailwind`flex-1 px-4`} activeOpacity={1} onPress={closeActiveState}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[{ zIndex: 1, flex: 1, paddingBottom: 40 }]}
      >
        <View style={tailwind`pt-4`}>
          <Text style={[
            tailwind`text-[16px] text-center`,
            { color, fontFamily: "Lato-Bold" }]}>please ensure that among the three input one must be correct, and it must match the designated correct answer.</Text>
        </View>
        <Formik
          initialValues={{ question: "", answer_one: "", answer_two: "", answer_three: "", correct_answer: "" }}
          validationSchema={questionValidation}
          onSubmit={(values) => {
            formQuestion(values)
          }}>
          {props => (
            <View style={[tailwind`flex-1 mt-3`]}>
              <View style={tailwind``}>
                <Text style={[
                  tailwind`text-[15px] font-semibold`,
                  { color, fontFamily: "Lato-Bold" }
                ]}>What type of question?</Text>
                <TouchableOpacity style={[tailwind`flex-row items-center mt-1 px-3 py-[5px] rounded-md`,
                { borderColor, backgroundColor: inputBgColor}
                ]} onPress={() => setShowQuestionType(!showQuestionType)}>
                  <Text style={[tailwind`flex-1`, {color, fontFamily: "Lato-Bold"}]}>{question} Question</Text>
                  <MaterialIcons name="arrow-drop-down" size={30} color="black" />
                </TouchableOpacity>
                {showQuestionType &&
                  <View style={[tailwind` rounded-md`, {backgroundColor: inputBgColor}]}>
                    <FlatList 
                      data={questionsType}
                      keyExtractor={item => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={[tailwind`px-3 py-[8px] border-[1px] rounded-md`,
                        { borderColor: bgColor, backgroundColor: inputBgColor }
                        ]} onPress={() => handleQuestion(item)}>
                          <Text style={[tailwind`text-center`, { color, fontFamily: "Lato-Bold" }]}>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                }
                <ScrollView style={tailwind``}>
                  <View style={tailwind`mt-4`}>
                    <Text style={[
                      tailwind`text-[15px] font-semibold`,
                      { color, fontFamily: "Lato-Bold" }
                    ]}>Enter question</Text>
                    <TextInput
                      style={[tailwind`mt-1 text-[14px] px-3 py-[11px] rounded-md`,
                      { borderColor, backgroundColor: inputBgColor, fontFamily: "Lato-Regular" }
                      ]}
                      placeholder=""
                      onChangeText={props.handleChange("question")}
                      onBlur={props.handleBlur("question")}
                      multiline
                      value={props.values.question}
                    />
                    <Text style={[tailwind`text-red-500 pl-4 text-[12px]`, { fontFamily: "Lato-Bold" }]}>{props.errors.question}</Text>
                  </View>

                  <Text style={[
                    tailwind`text-[16px] text-center font-semibold`,
                    { color, fontFamily: "Lato-Bold" }
                  ]}>Answers</Text>
                  <View style={tailwind``}>
                    <Text style={[
                      tailwind`text-[15px] font-semibold`,
                      { color, fontFamily: "Lato-Bold" }
                    ]}>First answer</Text>
                    <TextInput
                      style={[tailwind`mt-1 text-[14px] px-3 py-[11px] rounded-md`,
                      { borderColor, backgroundColor: inputBgColor, fontFamily: "Lato-Regular" }
                      ]}
                      placeholder=""
                      onChangeText={props.handleChange("answer_one")}
                      onBlur={props.handleBlur("answer_one")}
                      multiline
                      value={props.values.answer_one}
                    />
                    <Text style={[tailwind`text-red-500 pl-4 text-[12px]`, { fontFamily: "Lato-Bold" }]}>{props.errors.answer_one}</Text>
                  </View>
                  <View style={tailwind``}>
                    <Text style={[
                      tailwind`text-[15px] font-semibold`,
                      { color, fontFamily: "Lato-Bold" }
                    ]}>Second answer</Text>
                    <TextInput
                      style={[tailwind`mt-1 text-[14px] px-3 py-[11px] rounded-md`,
                      { borderColor, backgroundColor: inputBgColor, fontFamily: "Lato-Regular" }
                      ]}
                      placeholder=""
                      onChangeText={props.handleChange("answer_two")}
                      onBlur={props.handleBlur("answer_two")}
                      multiline
                      value={props.values.answer_two}
                    />
                    <Text style={[tailwind`text-red-500 pl-4 text-[12px]`, { fontFamily: "Lato-Bold" }]}>{props.errors.answer_two}</Text>
                  </View>
                  <View style={tailwind``}>
                    <Text style={[
                      tailwind`text-[15px] font-semibold`,
                      { color, fontFamily: "Lato-Bold" }
                    ]}>Third answer</Text>
                    <TextInput
                      style={[tailwind`mt-1 text-[14px] px-3 py-[11px] rounded-md`,
                      { borderColor, backgroundColor: inputBgColor, fontFamily: "Lato-Regular" }
                      ]}
                      placeholder=""
                      onChangeText={props.handleChange("answer_three")}
                      onBlur={props.handleBlur("answer_three")}
                      multiline
                      value={props.values.answer_three}
                    />
                    <Text style={[tailwind`text-red-500 pl-4 text-[12px]`, { fontFamily: "Lato-Bold" }]}>{props.errors.answer_three}</Text>
                  </View>
                  <View style={tailwind``}>
                    <Text style={[
                      tailwind`text-[15px] font-semibold`,
                      { color, fontFamily: "Lato-Bold" }
                    ]}>Correct answer</Text>
                    <TextInput
                      style={[tailwind`mt-1 text-[14px] px-3 py-[11px] rounded-md`,
                      { borderColor, backgroundColor: inputBgColor, fontFamily: "Lato-Regular" }
                      ]}
                      placeholder=""
                      onChangeText={props.handleChange("correct_answer")}
                      onBlur={props.handleBlur("correct_answer")}
                      multiline
                      value={props.values.correct_answer}
                    />
                    <Text style={[tailwind`text-red-500 pl-4 text-[12px]`, { fontFamily: "Lato-Bold" }]}>{props.errors.correct_answer}</Text>
                  </View>
                </ScrollView>

                <View style={tailwind``}>
                    <Text style={[
                      tailwind`text-[15px] font-semibold`,
                      { color, fontFamily: "Lato-Bold" }
                    ]}>Question Level</Text>
                    <TouchableOpacity style={[tailwind`flex-row items-center mt-1 px-3 py-[5px] rounded-md`,
                    { borderColor, backgroundColor: inputBgColor }
                    ]} onPress={() => setShowQuestionLevel(!showQuestionLevel)}>
                    <Text style={[tailwind`flex-1`, { color, fontFamily: "Lato-Bold" }]}>{questionLevel}</Text>
                      <MaterialIcons name="arrow-drop-down" size={30} color="black" />
                    </TouchableOpacity>
                    {showQuestionLevel &&
                      <View style={[tailwind` rounded-md`, { backgroundColor: inputBgColor }]}>
                        <FlatList
                          data={questionsLevelType}
                          keyExtractor={item => item}
                          renderItem={({ item }) => (
                            <TouchableOpacity style={[tailwind`px-3 py-[8px] border-[1px] rounded-md`,
                            { borderColor: bgColor, backgroundColor: inputBgColor }
                            ]} onPress={() => handleQuestionLevel(item)}>
                              <Text style={[tailwind`text-center`, { color, fontFamily: "Lato-Bold" }]}>{item}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    }
                </View>
              </View>
              <View style={tailwind`mt-[60px]`}>
                {props.values.question && props.values.answer_one && props.values.answer_two && props.values.answer_three && props.values.correct_answer?
                  <TouchableOpacity style={[
                    tailwind`py-2 rounded-md`,
                    { backgroundColor: buttonColor }
                  ]}>
                    <Text style={[
                      tailwind`font-bold text-[16px] text-center`,
                      { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }
                    ]}>Upload Question</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[
                    tailwind`py-2 rounded-md`,
                    { backgroundColor: containerColor }
                  ]}>
                    <Text style={[
                      tailwind`font-bold text-[16px] text-center`,
                      { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }
                    ]}>Upload Question</Text>
                  </TouchableOpacity>

                }
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  )
}

export default AddQuestionComponent

const styles = StyleSheet.create({})