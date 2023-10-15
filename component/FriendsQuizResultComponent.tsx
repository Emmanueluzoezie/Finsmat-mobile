import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderWithTwoItems from './HeaderWithTwoItems'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId, selectUserInfo } from '../slice/userSlice'
import { selectAppTheme } from '../slice/AppSlices'
import { resetAnsweredQuestions, selectAnswerQuestions } from '../slice/QuizSlice'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_USER_HISTORY, UPDATE_POINTS } from '../graphql/mutations'
import { GET_ALL_USER, GET_USER_BY_EMAIL } from '../graphql/queries'
import { appColor } from './AppColor'
import QuizLoadingComponent from './quiz/QuizLoadingComponent'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ResultComponent from './ResultComponent'
import LoadingAppComponent from './LoadingAppComponent'

const FriendsQuizResultComponent = ({ questions, questionType }) => {
    const [updatingPoint, setUpdatingPoint] = useState(false)
    const getUserResult = useSelector(selectAnswerQuestions)
    const appTheme = useSelector(selectAppTheme)
    const getUserInfo = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const getUserId = useSelector(selectUserId)

    const [addHistoryToDatabase] = useMutation(ADD_USER_HISTORY)

    //update user points to database
    const [addUserPoints] = useMutation(UPDATE_POINTS, {
        refetchQueries: [GET_USER_BY_EMAIL, "getUserByEmail"]
    })

    const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: getUserInfo?.email
        }
    })

    const correctAnswersCount = getUserResult.filter(question => question.isCorrect).length;
    const coinsToAward = correctAnswersCount * 10;

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const userDetails = data?.getUserByEmail[0]

    const handleBack = () => {
        dispatch(resetAnsweredQuestions());
        navigation.goBack();
    };

    const updateUserPoints = async () => {

        setUpdatingPoint(true)

        try {
            if (coinsToAward <= 0) return;
            const userCurrentPoints = userDetails.coins + coinsToAward;
            await addUserPoints({
                variables: {
                    id: getUserId,
                    coins: userCurrentPoints,
                },
            });
            await addHistoryToDatabase({
                variables: {
                    title: questionType,
                    user_id: userDetails.id,
                    amount: coinsToAward,
                    created_at: new Date(),
                    descriptions: `You've earned ${coinsToAward} points for answering ${correctAnswersCount} questions correctly during your game with friend.`,
                },
            });
            handleBack()
            setUpdatingPoint(false)

        } catch (error) {
            // Handle the error, e.g., display an error message or log it.
        }
    };


    // useS

    return (
        <View style={[tailwind`flex-1`]}>
            {loading || updatingPoint ?
                <LoadingAppComponent />
                :
                error ?
                    <View style={[tailwind`flex-1 justify-center items-center`,]}>
                        <Text style={[tailwind`text-[16px]`, { color, fontFamily: "Lato-Bold" }]}>Oops! An error occur in our end. Check your internet connection and try again</Text>
                        <TouchableOpacity style={[tailwind`justify-center items-center px-4 mt-6 py-2 rounded-md`, { backgroundColor: buttonColor }]} onPress={() => navigation.goBack()}>
                            <Text style={[tailwind`font-bold text-[16px]`, { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }]}>Click to reload</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={[tailwind`flex-1`]}>
                        <View style={[tailwind`flex-row items-center pt-10 pb-3 px-3 pr-10`, { backgroundColor: containerColor }]}>
                            <HeaderWithTwoItems
                                Icon={MaterialIcons}
                                name="chevron-left"
                                onPress={updateUserPoints}
                                title="Results"
                                size={30}
                            />
                        </View>
                        <View style={[tailwind`px-3 pt-6`]}>
                            <Text style={[tailwind`text-center text-[16px] font-semibold`, { color, fontFamily: 'Lato-Regular' }]}>You have been awarded <Text style={{ fontFamily: "Lato-Bold", color: buttonColor }}> won {coinsToAward} </Text> points for answering {correctAnswersCount} questions correctly</Text>
                        </View>
                        <Text style={[tailwind`text-center text-[18px] mt-5 font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>
                            Here are the answers
                        </Text>
                        <FlatList
                            data={questions}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (
                                < ResultComponent question={item.question} correctAnswer={item.correct_answer} />
                            )}
                        />
                        <View style={tailwind`absolute bottom-20 px-4 w-full`}>
                            <TouchableOpacity style={[
                                tailwind`py-2 rounded-md`,
                                { backgroundColor: buttonColor }
                            ]} onPress={updateUserPoints}>
                                <Text style={[
                                    tailwind`font-bold text-[16px] text-center`,
                                    { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }
                                ]}>Go to quiz session</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }
        </View>
    )
}

export default FriendsQuizResultComponent

const styles = StyleSheet.create({})