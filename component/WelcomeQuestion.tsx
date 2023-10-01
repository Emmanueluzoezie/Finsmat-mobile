import { Animated, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import tailwind from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCurrencyInfo, selectNameOfItem, setCurrencyInfo, setNameOfItem, setShowResult, setWelcomeAmount } from '../slice/welcomeSlice';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { currencies, dailyTreat } from '../utilies/WelcomeArrayItems';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';


const formValidation = yup.object().shape({
    amount: yup
        .string()
        .matches(/^[0-9]+$/, 'only number is accepted')
        .required('amount is required'),
})


const WelcomeQuestion = () => {
    const [showTreat, setShowTreat] = useState(false)
    const [showCurrencies, setShowCurrencies] = useState(false)
    const appTheme = useSelector(selectAppTheme);
    const getSelectedCurrency = useSelector(selectedCurrencyInfo)
    const getTreat = useSelector(selectNameOfItem)
    const dispatch = useDispatch()

    const handleCurrencyChange = (currency) => {
        dispatch(setCurrencyInfo({
            name: currency.name,
            country: currency.country,
            symbol: currency.symbol
        }));
        setShowCurrencies(false)
    };

    const slideUpAnimation = new Animated.Value(0); 

    const handleChangeTreat = (treat) => {
        dispatch(setNameOfItem(treat));
        setShowTreat(false)
    };

    const handleFormSubmit = (values) => {
        dispatch(setWelcomeAmount(values.amount))
        dispatch(setShowResult(true))
    }

    const removeKeyboard =() => {
        Keyboard.dismiss
        setShowTreat(false)
        setShowCurrencies(false)
    }

    const toggleCurrencies = () => {
        const toValue = showCurrencies ? 100 : 0; // Adjust the values as needed
        Animated.timing(slideUpAnimation, {
            toValue,
            duration: 300, // Adjust the duration of the animation as needed
            useNativeDriver: false, // Required for certain properties like shadow
        }).start();
        setShowCurrencies(!showCurrencies); // Toggle the show/hide state
    };

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

    const inputBgColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor
    
    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.inputLightBgColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    return (
        <TouchableOpacity activeOpacity={1} onPress={removeKeyboard} style={tailwind`flex-1 relative`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[{ zIndex: 1, flex: 1, paddingBottom: 10 }]}
            >
                <View style={tailwind`items-center mt-4`}>
                    <Image source={require("../assets/budgetlog.png")} style={[tailwind` w-[100px] h-[100px]`]} />
                </View>
                <View style={[tailwind`py-4 flex-1`]}>
                    <Formik
                        initialValues={{ amount: "" }}
                        validationSchema={formValidation}
                        onSubmit={(values) => {
                            handleFormSubmit(values)
                        }}>
                        {props => (
                            <View style={[tailwind`mt-14`]}>
                                <View style={tailwind`px-3`}>
                                    <Text style={[
                                        tailwind` text-[17px] font-semibold`,
                                        { color }
                                    ]}>What's your daily treat?</Text>
                                    <FlatList
                                        data={dailyTreat}
                                        keyExtractor={item => item.treat}
                                        horizontal={true}
                                        style={tailwind`flex-row`}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={[tailwind`items-center justify-center p-3 px-6 rounded-2xl m-4 w-[170px] h-[150px]`, { backgroundColor: containerColor }]}
                                                onPress={() => handleChangeTreat(item.treat)}
                                            >
                                                <Image source={item.image} style={tailwind`w-[100px] h-[100px]`} />
                                                <Text style={[tailwind`mt-2 text-[15px] font-semibold`, { color: textColor }]}>{item.treat}</Text>
                                                {getTreat && item.treat && getTreat.toLowerCase && item.treat.toLowerCase && getTreat.toLowerCase() === item.treat.toLowerCase() && (
                                                    <MaterialCommunityIcons
                                                        name="checkbox-marked-circle"
                                                        size={24}
                                                        color={appColor.primaryColor}
                                                        style={tailwind`absolute top-2 right-3`}
                                                    />
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    />

                                </View>
                                <View style={tailwind`flex-row items-center px-3 mt-10`}>
                                    <View style={tailwind`flex-1`}>
                                        <Text style={[
                                            tailwind`text-[15px] font-semibold`,
                                            { color }
                                        ]}>How much do you spend on it?</Text>
                                        <TextInput
                                            style={[tailwind`mt-1 text-[15px] px-3 py-[11px] rounded-md`,
                                            { borderColor, backgroundColor: inputBgColor }
                                            ]}
                                            placeholder="0"
                                            onChangeText={props.handleChange("amount")}
                                            onBlur={props.handleBlur("amount")}
                                            value={props.values.amount}
                                            autoFocus={true}
                                            keyboardType="numeric"
                                        />
                                        <Text style={tailwind`text-red-500 pl-4`}>{props.errors.amount}</Text>
                                    </View>
                                    <View style={tailwind``}>
                                        <TouchableWithoutFeedback onPress={toggleCurrencies}>
                                            <View style={[tailwind`p-3 rounded-md mt-2 mx-2 flex-row justify-between`, { backgroundColor: inputBgColor }]}>
                                                <View style={tailwind`flex-row`}>
                                                    <Text style={[tailwind`font-semibold`, , { color }]}>({getSelectedCurrency.name})</Text>
                                                </View>
                                                <AntDesign name="caretdown" size={14} color={color} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        
                                    </View>
                                </View>

                            {showCurrencies &&
                                    <View style={[tailwind`absolute rounded-t-2xl bottom-[-220px] pt-4 pb-12 w-full`, {
                                        zIndex: 10,
                                        backgroundColor: containerColor,
                                        shadowColor: 'black',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 2,
                                        transform: [{ translateY: slideUpAnimation }],
                                    },
                                    ]}>
                                    <FlatList
                                        data={currencies}
                                        keyExtractor={item => item.symbol}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity
                                                style={[
                                                    tailwind`flex-row justify-center items-center p-3`,
                                                    {
                                                        borderColor: textColor,
                                                        borderTopWidth: index === 0 ? 0 : 1, // Remove top border for the first item
                                                        borderBottomWidth: index === currencies.length - 1 ? 0 : 1, // Remove bottom border for the last item
                                                    },
                                                ]}
                                                onPress={() => handleCurrencyChange(item)}
                                            >
                                                <Text style={[tailwind`text-[15px] font-semibold`, { color: textColor }]}>{item.country}</Text>
                                                <Text style={[tailwind`pl-4 text-[15px] font-semibold`, { color: textColor }]}>({item.name})</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            }
                                <View style={tailwind`mt-16 px-3`}>
                                    {props.values.amount ?
                                        <TouchableOpacity style={[tailwind`py-2 my-4 rounded-md`,
                                        {
                                            backgroundColor: buttonColor
                                        }]}
                                            onPress={() => props.handleSubmit()}>
                                            <Text style={[
                                                tailwind` text-center font-bold text-[18px]`,
                                                { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor }
                                            ]}>Find out</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={[tailwind`py-2 my-4 rounded-md`,
                                        {
                                            backgroundColor: containerColor
                                        }]}>
                                            <Text style={[
                                                tailwind` text-center font-bold text-[18px]`,
                                                { color: bgColor }
                                            ]}>Find out</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
        </TouchableOpacity>
    )
}

export default WelcomeQuestion

const styles = StyleSheet.create({})