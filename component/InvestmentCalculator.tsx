import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'
import tailwind from 'twrnc'
import { AntDesign } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as yup from 'yup'

const calculatorValidation = yup.object().shape({
    amount: yup
        .string()
        .matches(/^[0-9]+$/, 'invalid amount')
        .required('Amount is required'),
    timeInYears: yup
        .string()
        .matches(/^[0-9]+$/, 'invalid number')
        .required('Invest year is required'),
})

const depositScheduleChoices = [
    { id: 1, period: "daily"},
    {id: 2, period: "weekly"},
    { id: 3, period:"2 week"},
    {id: 4, period: "monthly"},
]

const InvestmentCalculator = () => {
    const [result, setResult] = useState("")
    const [depositSchedule, setDepositSchedule] = useState("daily")
    const appTheme = useSelector(selectAppTheme)
    const [openSchedule, setOpenSchedule] = useState(false)

    function calculateFutureValue(value) {
        let futureValue = 0;
        let compoundFrequency = 0;

        // Determine the deposit frequency based on the deposit schedule
        switch (depositSchedule) {
            case 'daily':
                compoundFrequency = 365;
                break;
            case 'weekly':
                compoundFrequency = 52;
                break;
            case '2 week':
                compoundFrequency = 26;  // 52 weeks in a year divided by 2
                break;
            case 'monthly':
                compoundFrequency = 12;
                break;
            default:
                return "Invalid deposit schedule";
        }

        // Calculate the future value without interest
        futureValue = parseInt(value.amount) * compoundFrequency * value.timeInYears;
        const formattedTotalAmount = Number(futureValue.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        setResult(formattedTotalAmount);  // Round to 2 decimal places
    }

    const handleScheduleChoice = (depositSchedule) => {
        setDepositSchedule(depositSchedule)
        setOpenSchedule(false)
    }

    const handleRemoveKeyboard = () => {
        Keyboard.dismiss()
        setOpenSchedule(false)
    }

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark"? appColor.primaryDarkColor : appColor.primaryColor

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const inputBgColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor


    return (
        <TouchableOpacity style={[tailwind`p-4`]} activeOpacity={1} onPress={handleRemoveKeyboard}>
            <View style={[tailwind``]}>
                <Text style={[
                    tailwind`text-center text-[15px]`,
                    { color, fontFamily: 'Lato-Regular' }
                ]}>Use this calculator to estimate the future value of an investment.</Text>
                {result &&
                    <View style={[
                        tailwind` py-1 mt-8 mb-4 rounded-md`,
                        { backgroundColor: buttonColor }
                    ]}>
                        <Text style={[
                            tailwind` text-center font-bold text-[15px]`,
                            { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }
                        ]}>The future value of your investment will be ${result}</Text>
                    </View>
                }
                <Formik
                    initialValues={{ amount: '', timeInYears: "" }}
                    validationSchema={calculatorValidation}
                    onSubmit={(values) => {
                        calculateFutureValue(values)
                    }}>
                    {props => (
                        <View style={[tailwind``]}>
                            <View style={[tailwind`text-center font-semibold mt-6 text-[16px]`]}>
                                <Text style={[
                                    tailwind`pl-2 font-semibold`,
                                    { color, fontFamily: "Lato-Bold" }
                                ]}>Investment Amount</Text>
                                <TextInput style={[tailwind`mt-1 text-[15px] p-3 rounded-md`,
                                { borderColor, backgroundColor: inputBgColor }
                                ]}
                                    placeholder="0"
                                    placeholderTextColor={color}
                                    keyboardType="numeric"
                                    value={props.values.amount}
                                    onBlur={props.handleBlur("amount")}
                                    onChangeText={props.handleChange("amount")}
                                    autoFocus={true}
                                />
                                <Text style={[tailwind`pl-6 text-[#e33010] text-[10px]`, { fontFamily: 'Lato-Bold' }]}>{props.errors.amount}</Text>
                            </View>
                            <View style={tailwind`mt-4`}>
                                <Text style={[
                                    tailwind`pl-2 font-semibold`,
                                    { color, fontFamily: 'Lato-Bold' }
                                ]}>Investment Years</Text>
                                <TextInput style={[tailwind`mt-1 text-[15px] p-3 rounded-md`,
                                { borderColor, backgroundColor: inputBgColor }
                                ]}
                                    placeholder="0"
                                    onBlur={props.handleBlur("timeInYears")}
                                    placeholderTextColor={color}
                                    keyboardType="numeric"
                                    value={props.values.timeInYears}
                                    onChangeText={props.handleChange("timeInYears")}
                                />
                                <Text style={[tailwind`pl-6 text-[#e33010] text-[10px]`, { fontFamily: 'Lato-Bold' }]}>{props.errors.timeInYears}</Text>
                            </View>
                            <View style={tailwind`mt-4`}>
                                <Text style={[
                                    tailwind`pl-2 pb-1 font-semibold`,
                                    { color, fontFamily: 'Lato-Bold' }
                                ]}>Deposit Schedule</Text>
                                <TouchableOpacity onPress={() => setOpenSchedule(!openSchedule)}>
                                    <View style={[tailwind`p-3 rounded-md mt-1 flex-row justify-between`, { backgroundColor: inputBgColor }]}>
                                        <View style={tailwind`flex-row`}>
                                            <Text style={[tailwind`font-semibold pr-4 capitalize`, { color, fontFamily: 'Lato-Bold' }]}>{depositSchedule}</Text>
                                        </View>
                                        <AntDesign name="caretdown" size={14} color={color} />
                                    </View>
                                </TouchableOpacity>
                                {openSchedule &&
                                    <View style={[tailwind`absolute top-[-90px] shadow-2xl`, { backgroundColor: bgColor, zIndex: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 }]}>
                                        <FlatList
                                            data={depositScheduleChoices}
                                            keyExtractor={item => item.id.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={[tailwind` flex-row items-center p-3 rounded-md w-[210px]`, { backgroundColor: containerColor, marginVertical: 1 }]} onPress={() => handleScheduleChoice(item.period)}>
                                                    <Text style={[tailwind` text-[15px] font-semibold`, { color: textColor }]}>{item.period}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                }
                            </View>
                            <View style={tailwind`mt-6`}>
                                {props.values.amount && props.values.timeInYears && depositSchedule?
                                    <TouchableOpacity style={[tailwind`py-2 my-4 rounded-md`,
                                    {
                                        backgroundColor: buttonColor
                                    }]} 
                                    onPress={() =>props.handleSubmit()}>
                                        <Text style={[
                                            tailwind` text-center font-bold text-[18px]`,
                                            { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }
                                        ]}>Calculate</Text>
                                    </TouchableOpacity>
                                   :
                                    <TouchableOpacity style={[tailwind`py-2 my-4 rounded-md`,
                                    {
                                        backgroundColor: containerColor
                                    }]}>
                                        <Text style={[
                                            tailwind` text-center font-bold text-[18px]`,
                                            { color: bgColor, fontFamily: 'Lato-Bold' }
                                        ]}>Calculate</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity style={[tailwind`border-2 py-2 my-4 rounded-md`,
                                {
                                    borderColor: buttonColor
                                }]} onPress={() => {
                                    props.resetForm()
                                    setResult("")
                                    }}>
                                    <Text style={[
                                        tailwind` text-center font-bold text-[18px]`,
                                        { color: buttonColor, fontFamily: 'Lato-Bold' }
                                    ]}>Reset</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View> 
        </TouchableOpacity>
    )
}

export default InvestmentCalculator

const styles = StyleSheet.create({})