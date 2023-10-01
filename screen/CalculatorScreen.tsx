import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setCurrentScreen } from '../slice/AppSlices'
import { useNavigation, useRoute } from '@react-navigation/native'
import { appColor } from '../component/AppColor'
import tailwind from 'twrnc'
import BottomNavigationContainer from '../component/BottomNavigationContainer'
import HeaderComponent from '../component/HeaderComponent'
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import CalculatorComponent from '../component/CalculatorComponent'
import CompoundCalculator from '../component/CompoundCalculator'
import { selectCalculatorCurrentScreen, setCalculatorCurrentScreen } from '../slice/ScreenSlice'
import InvestmentCalculator from '../component/InvestmentCalculator'

const CalculatorScreen = () => {
    const appTheme = useSelector(selectAppTheme)
    const currentScreen = useSelector(selectCalculatorCurrentScreen)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const route = useRoute().name

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const primaryColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    useEffect(() => {
        dispatch(setCurrentScreen("home"))
    }, [])

    return (
        <View style={[
            tailwind`flex-1`,
            { backgroundColor: bgColor }
        ]}>
            <View style={[tailwind`flex-row items-center pt-10 pb-3 px-3`, { backgroundColor: containerColor }]}>
                <HeaderComponent
                    IconOne={Entypo}
                    IconTwo={MaterialIcons}
                    nameOne="chevron-left"
                    nameTwo="notifications"
                    onPressOne={() => navigation.goBack()}
                    onPressTwo={() => {}}
                    title="Calculator"
                    sizeOne={24}
                    sizeTwo={20}
                />
                <Ionicons name="person-circle" size={24} color={color} style={[tailwind`ml-2`]} onPress={() => navigation.navigate("profile")} />
            </View>
            {/* <CalculatorComponent /> */}
            <View style={[tailwind`flex-row mt-7`]}>
                <View style={[
                    tailwind`flex-1 px-2 pb-1 items-center`,
                    {
                        borderBottomWidth: currentScreen === "investment" && 4,
                        borderColor: currentScreen === "investment" ? primaryColor : color
                    }
                ]}>
                    <TouchableOpacity
                        onPress={() => dispatch(setCalculatorCurrentScreen("investment"))}>

                        <Text style={[
                            tailwind`text-17px`,
                            {
                                color: currentScreen === "investment" ? primaryColor : color,
                                fontWeight: currentScreen === "investment" ? "bold" : "500",
                            }
                        ]}>Investment</Text>
                    </TouchableOpacity>
                </View>
                <View style={[
                    tailwind`flex-1 px-2 pb-1 items-center`,
                    {
                        borderBottomWidth: currentScreen === "compound" && 4,
                        borderColor: currentScreen === "compound" ? primaryColor : color
                    }
                ]}>
                    <TouchableOpacity
                        onPress={() => dispatch(setCalculatorCurrentScreen("compound"))}
                    >
                        <Text style={[
                            tailwind`text-17px`,
                            {
                                color: currentScreen === "compound" ? primaryColor : color,
                                fontWeight: currentScreen === "compound" ? "bold" : "500",
                            }
                        ]}>Compound</Text>
                    </TouchableOpacity>
                </View>
            </View>
           {currentScreen === "compound"?
            <CompoundCalculator />
            :
            <InvestmentCalculator />
           }
        </View>
    );
};

const styles = StyleSheet.create({
    
});
export default CalculatorScreen