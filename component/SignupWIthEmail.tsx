import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setErrorMessage, } from '../slice/AppSlices'
import { appColor } from './AppColor'
import { LOGIN_PROVIDER } from "@web3auth/react-native-sdk";
import { solanaAddress } from '../utilies/solana'
import { selectWeb3Auth } from '../slice/userSlice'

const emailValidation = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required')
        .test('email-validation', 'Please enter a valid email address', (value) => {
            if (value) {
                // Use a regular expression or any other method to validate the email format
                // Return true if the email is valid, otherwise return false
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                return emailRegex.test(value);
            }
            return true; // Skip the validation if the field is empty
        }),
    })

const scheme = 'calbuild';
const resolvedRedirectUrl = `${scheme}://web3auth`

const SignupWIthEmail = () => {
    const [loading, setLoading] = useState(false)
    const appTheme = useSelector(selectAppTheme)
    const web3auth = useSelector(selectWeb3Auth)
    const dispatch = useDispatch()


    const textColor = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const buttonBgColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const buttonTextColor = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor

    const placeholderColor = appTheme === "dark" ? appColor.secondaryDarkBackground : appColor.lightSecondaryBackground

    const loginWithEmailPasswordless = async (value) => {
        dispatch(setErrorMessage(""))
        setLoading(true)

        setTimeout(() => {
            dispatch(setErrorMessage("Oops, something went wrong while signing in. Please check your internet connection and try again or use Google or facebook or twitter to login"))
            setLoading(false)
        }, 10000)
        // try {
        //     await web3auth.login({
        //         loginProvider: LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
        //         redirectUrl: resolvedRedirectUrl,
        //         mfaLevel: "none",
        //         curve: "secp256k1",
        //         extraLoginOptions: {
        //             loginHint: value.email
        //         }
        //     });

        //     if (web3auth.privKey) {
        //         dispatch(setUserInfo(web3auth.userInfo()));
        //         dispatch(setKey(web3auth.privKey));

        //         // Create a new Solana address
        //         await solanaAddress()
        //     }
        // } catch (e) {
        //     // Handle error
        //     console.error(e);
        // }
    };

  return (
    <View style={[tailwind`pt-4`]}>
          <Text style={[
              tailwind`text-center pb-2 font-bold text-[16px]`,
              { color: textColor }
          ]}>OR</Text>
        <Formik
            initialValues={{ email: '' }}
            validationSchema={emailValidation}
            onSubmit={(values) => {
                loginWithEmailPasswordless(values)
            }}>
              {props => (
                <View style={[tailwind`pt-6`]}>
                    <Text style={[
                          tailwind`pl-2 pb-1 font-semibold`,
                          { color: textColor }
                      ]}>Email</Text>
                    <TextInput
                        onChangeText={props.handleChange("email")}
                        onBlur={props.handleBlur("email")}
                        value={props.values.email}
                        style={[
                            tailwind`text-[16px] py-[10px] rounded-md px-2 border-2`,
                            { borderColor: borderColor, color: textColor }
                        ]}
                    />
                    <View style={[tailwind`pt-8`]}>

                        { props.values.email?
                            <TouchableWithoutFeedback onPress={() => props.handleSubmit()}>
                                <View style={[
                                    tailwind`flex-row justify-center items-center p-3 rounded-md `,
                                    { backgroundColor: buttonBgColor }
                                ]}>
                                      {loading && <ActivityIndicator size="small" color={buttonTextColor} />}
                                      <Text style={[tailwind`font-bold text-[17px] px-2`,
                                        { color: buttonTextColor, letterSpacing: 0.6 }
                                    ]}>Sign up with email</Text>
                                    
                                </View>
                            </TouchableWithoutFeedback>
                            :
                            <TouchableWithoutFeedback>
                                <View style={[
                                    tailwind`flex-row justify-center items-center p-3 rounded-md`,
                                      { backgroundColor: containerColor }
                                ]}>
                                    <Text style={[tailwind`font-semibold px-2`,
                                        { color: placeholderColor, letterSpacing: 0.6 }
                                    ]}>Sign up with email</Text>
                                    
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
              )
        }
        </Formik>
    </View>
  )
}

export default SignupWIthEmail

const styles = StyleSheet.create({})