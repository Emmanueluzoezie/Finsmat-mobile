import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
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
        .matches(/^[0-9]+$/, 'only number is accepted')
        .required('Amount is required'),
    compoundPerYear: yup
        .string()
        .matches(/^[0-9]+$/, 'only number is accepted')
        .required('compound year is required'),
    timeInYears: yup
        .string()
        .matches(/^[0-9]+$/, 'only number is accepted')
        .required('times  in year is required'),
    rate: yup
        .string()
        .matches(/^[0-9]*\.?[0-9]*$/, 'only number is accepted')
        .required('rate is required'),
})

const CompoundCalculator = () => {
    const appTheme = useSelector(selectAppTheme)
    const [result, setResult] = useState(null);

    const calculateCompoundInterest = (value) => {
        const p = parseFloat(value.amount);
        const r = parseFloat(value.rate) / 100;
        const t = parseFloat(value.timeInYears);
        const n = parseFloat(value.compoundPerYear);

        const totalAmount = p * Math.pow(1 + r / n, n * t);
        const formattedTotalAmount = Number(totalAmount.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        setResult(formattedTotalAmount);
    };

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const inputBgColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

    const handleRemoveKeyboard = () => {
        Keyboard.dismiss()
        // setOpenSchedule(false)
    }

    return (
        <TouchableOpacity style={[tailwind`py-4 flex-1`]} activeOpacity={1} onPress={handleRemoveKeyboard}>
            <View style={[tailwind`flex-1`]}>
                <Text style={[
                    tailwind`text-center text-[15px]`,
                    { color }
                ]}>Welcome to the Compound Interest Calculator. This tool helps you find out how much money you'll have in the future if you invest</Text>

                {result &&
                    <View style={[
                        tailwind` py-1 mt-4 rounded-md`,
                        { backgroundColor: buttonColor }
                    ]}>
                        <Text style={[
                            tailwind` text-center font-bold text-[15px]`,
                            { color: appTheme === "dark"? appColor.lightTextColor: appColor.darkTextColor }
                        ]}>The future value of your investment will be ${result}</Text>
                    </View>
                }
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={[{ zIndex: 1, flex: 1, paddingBottom: 10 }]}
                >
                    <Formik
                        initialValues={{ amount: '', timeInYears: "", compoundPerYear: "", rate: "" }}
                        validationSchema={calculatorValidation}
                        onSubmit={(values) => {
                            calculateCompoundInterest(values)
                        }}>
                        {props => (
                            <ScrollView style={[tailwind`px-4`]}>
                                <View style={[tailwind`text-center font-semibold mt-6 text-[16px]`]}>
                                    <Text style={[
                                        tailwind`pl-2 font-semibold`,
                                        { color }
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
                                    />
                                    <Text style={tailwind`pl-6 text-[#e33010] text-[10px]`}>{props.errors.amount}</Text>
                                </View>
                                <View style={tailwind`mt-4`}>
                                    <Text style={[
                                        tailwind`pl-2 font-semibold`,
                                        { color }
                                    ]}>Annual Interest Rate</Text>
                                    <TextInput style={[tailwind`mt-1 text-[15px] p-3 rounded-md`,
                                    { borderColor, backgroundColor: inputBgColor }
                                    ]}
                                        placeholder="0"
                                        onBlur={props.handleBlur("rate")}
                                        placeholderTextColor={color}
                                        keyboardType="numeric"
                                        value={props.values.rate}
                                        onChangeText={props.handleChange("rate")}
                                    />
                                    <Text style={tailwind`pl-6 text-[#e33010] text-[10px]`}>{props.errors.rate}</Text>
                                </View>
                                <View style={tailwind`mt-4`}>
                                    <Text style={[
                                        tailwind`pl-2 font-semibold`,
                                        { color }
                                    ]}>Compounding Periods per Year</Text>
                                    <TextInput style={[tailwind`mt-1 text-[15px] p-3 rounded-md`,
                                    { borderColor, backgroundColor: inputBgColor }
                                    ]}
                                        placeholder="0"
                                        onBlur={props.handleBlur("compoundPerYear")}
                                        placeholderTextColor={color}
                                        keyboardType="numeric"
                                        value={props.values.compoundPerYear}
                                        onChangeText={props.handleChange("compoundPerYear")}
                                    />
                                    <Text style={tailwind`pl-6 text-[#e33010] text-[10px]`}>{props.errors.compoundPerYear}</Text>
                                </View>
                                <View style={tailwind`mt-4`}>
                                    <Text style={[
                                        tailwind`pl-2 font-semibold`,
                                        { color }
                                    ]}>Number of Years</Text>
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
                                    <Text style={tailwind`pl-6 text-[#e33010] text-[10px]`}>{props.errors.timeInYears}</Text>
                                </View>
                                
                                <View style={tailwind`mt-6`}>
                                    {props.values.amount && props.values.timeInYears && props.values.rate && props.values.compoundPerYear  ?
                                        <TouchableOpacity style={[tailwind`py-2 my-4 rounded-md`,
                                        {
                                            backgroundColor: buttonColor
                                        }]}
                                            onPress={() => props.handleSubmit()}>
                                            <Text style={[
                                                tailwind` text-center font-bold text-[15px]`,
                                                { color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor }
                                            ]}>Calculate</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={[tailwind`py-2 my-4 rounded-md`,
                                        {
                                            backgroundColor: containerColor
                                        }]}>
                                            <Text style={[
                                                tailwind` text-center font-bold text-[18px]`,
                                                { color: bgColor }
                                            ]}>Calculate</Text>
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity style={[tailwind`border-2 py-2 my-4 rounded-md`,
                                    {
                                        borderColor: buttonColor
                                    }]} onPress={() => props.resetForm()}>
                                        <Text style={[
                                            tailwind` text-center font-semibold text-[16px]`,
                                            { color: buttonColor }
                                        ]}>Reset</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </View>
        </TouchableOpacity>
    )
}

export default CompoundCalculator

const styles = StyleSheet.create({})