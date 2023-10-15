import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'
import { selectAppTheme } from '../../slice/AppSlices'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const QuizChellange = () => {
    const appTheme = useSelector(selectAppTheme)
    const navigation = useNavigation()

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const containerColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    return (
        <View style={[
            tailwind``,
        ]}>
            <View style={[tailwind`flex-row justify-between items-center p-2`]}>
                <Text style={[
                    tailwind`font-semibold text-[16px]`,
                    {color, fontFamily: 'Lato-Bold'}
                    ]}>Quiz Challenge</Text>
                <TouchableOpacity onPress={() => navigation.navigate("quiz")}>
                    <View style={[tailwind`flex-row items-center`]}>
                        <Text style={[
                            tailwind` px-2 font-semibold`,
                            { color, fontFamily: 'Lato-Bold' }
                        ]}>See all</Text>
                        <AntDesign name="caretdown" size={12} color={color} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={[tailwind`flex-row`]}>
                <View style={[
                    tailwind`px-3 py-1 flex-1 justify-between rounded-lg mx-2 flex-1 relative h-[90px]`,
                    {backgroundColor: appColor.ternaryColor}
                    ]}>
                    <Text style={[
                        tailwind`font-semibold text-[17px] mt-2 pb-4`,
                        { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }
                    ]}>In Progress Quiz</Text>
                    <Text style={[
                        tailwind`text-[14px] pb-2`,
                        { color: appColor.lightTextColor, fontFamily: 'Lato-Regular' }
                    ]}>Explore this week quiz challenge</Text>
                    <Text style={[
                        tailwind`font-semibold text-[12px] absolute bottom-2 right-2`,
                        { color: appColor.primaryColor, fontFamily: 'Lato-Bold' }
                    ]}>2/7</Text>
                </View>
                <View style={[
                    tailwind`px-3 py-1 flex-1 rounded-lg mx-2 flex-1 justify-between relative h-[90px]`,
                    {backgroundColor: appColor.secondaryColor}
                    ]}>
                    <Text style={[
                        tailwind`font-semibold text-[18px] mt-2 pb-4`,
                        { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }
                    ]}>Available Quiz</Text>
                    <Text style={[
                        tailwind`text-[14px] pb-2`,
                        { color: appColor.lightTextColor, fontFamily: 'Lato-Regular' }
                    ]}>Explore this month quiz challenge</Text>
                    <Text style={[
                        tailwind`font-semibold text-[12px] absolute bottom-2 right-2`,
                        { color: appColor.primaryColor, fontFamily: 'Lato-Bold' }
                    ]}>10/30</Text>
                </View>
            </View>
            <View style={[tailwind`flex-row  my-3`]}>
                <View style={[
                    tailwind`px-3 py-1 flex-1 justify-between rounded-lg mx-2 flex-1 relative h-[90px]`,
                    {backgroundColor: appColor.ternaryColor}
                    ]}>
                    <Text style={[
                        tailwind`font-semibold text-[17px] mt-2 pb-4`,
                        { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }
                    ]}>In Progress Quiz</Text>
                    <Text style={[
                        tailwind`text-[14px] pb-2`,
                        { color: appColor.lightTextColor, fontFamily: 'Lato-Regular' }
                    ]}>Explore this week quiz challenge</Text>
                    <Text style={[
                        tailwind`font-semibold text-[12px] absolute bottom-2 right-2`,
                        { color: appColor.primaryColor, fontFamily: 'Lato-Bold' }
                    ]}>2/7</Text>
                </View>
                <View style={[
                    tailwind`px-3 py-1 flex-1 rounded-lg mx-2 flex-1 justify-between relative h-[90px]`,
                    {backgroundColor: appColor.secondaryColor}
                    ]}>
                    <Text style={[
                        tailwind`font-semibold text-[18px] mt-2 pb-4`,
                        { color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }
                    ]}>Available Quiz</Text>
                    <Text style={[
                        tailwind`text-[14px] pb-2`,
                        { color: appColor.lightTextColor, fontFamily: 'Lato-Regular' }
                    ]}>Explore this month quiz challenge</Text>
                    <Text style={[
                        tailwind`font-semibold text-[12px] absolute bottom-2 right-2`,
                        { color: appColor.primaryColor, fontFamily: 'Lato-Bold' }
                    ]}>10/30</Text>
                </View>
            </View>
        </View>
    )
        }

export default QuizChellange

const styles = StyleSheet.create({})