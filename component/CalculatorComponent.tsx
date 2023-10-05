import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'twrnc';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';

export default function CalculatorComponent() {
    const [currentNum, setCurrentNum] = useState('0');
    const [previousNum, setPreviousNum] = useState(null);
    const [operation, setOperation] = useState(null);
    const [result, setResult] = useState(null);
    const appTheme = useSelector(selectAppTheme)

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const containerColor = appTheme === "dark"? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark"? appColor.darkTextColor : appColor.lightTextColor

    const clear = () => {
        setCurrentNum('0');
        setPreviousNum(null);
        setOperation(null);
        setResult(null);
    };

    const appendNumber = (num) => {
        if (result !== null) {
            clear();
        }

        setCurrentNum((prevCurrentNum) => {
            if (prevCurrentNum === '0') {
                return num;
            } else {
                return prevCurrentNum + num;
            }
        });
    };
    const calculate = () => {
        let res;
        switch (operation) {
            case '+':
                res = parseFloat(previousNum) + parseFloat(currentNum);
                break;
            case '-':
                res = parseFloat(previousNum) - parseFloat(currentNum);
                break;
            case 'x':
                res = parseFloat(previousNum) * parseFloat(currentNum);
                break;
            case '÷':
                res = parseFloat(previousNum) / parseFloat(currentNum);
                break;
            default:
                break;
        }
        if (res !== undefined) {
            setResult(res);
            setCurrentNum(res.toString());
        }
        setPreviousNum(null);
        setOperation(null);
    };



    const chooseOperation = (op) => {
        if (previousNum !== null && operation !== null && currentNum !== '') {
            // Perform the calculation if there's an existing operation
            calculate();
        }

        if (result !== null && result !== undefined) {
            setCurrentNum(result.toString());
            setPreviousNum(null);
            setResult(null);
        }

        setOperation(op);
        if (previousNum === null) {
            setPreviousNum(currentNum);
        }
        setCurrentNum('');
    };

    // const test =(op)=> {
    //     // if(p)
    // }

    return (
        <View style={[tailwind`flex-1 pb-20 pt-10`,
        {
            backgroundColor: bgColor
        }]}>
            <ScrollView style={tailwind`flex-1 px-4`}>
                <Text style={[tailwind`text-4xl text-right my-1`,
                { color, fontFamily: 'Lato-Bold' }
                ]}>{previousNum}</Text>
                <Text style={[tailwind`text-4xl text-right my-1`,
                { color, fontFamily: 'Lato-Bold' }
                ]}>{operation}</Text>
                <Text style={[tailwind`text-4xl text-right my-1`,
                { color, fontFamily: 'Lato-Bold' }
                ]}>{currentNum}</Text>
                <Text style={[tailwind`text-4xl text-right my-1`,
                { color, fontFamily: 'Lato-Bold' }
                ]}>{result}</Text>
            </ScrollView>
            <View style={tailwind`flex-row justify-center flex-wrap`}>
                <TouchableOpacity style={[tailwind`m-2 w-[70px] h-[70px] rounded-md justify-center items-center`, {
                    backgroundColor: containerColor, color: color
                }]} onPress={() => clear()}>
                    <Text style={[
                        tailwind`text-3xl font-bold`,
                        { color, fontFamily: 'Lato-Bold' }
                    ]}>C</Text>
                </TouchableOpacity>
                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((num) => (
                    <TouchableOpacity key={num} style={[tailwind`m-2 w-[70px] h-[70px] rounded-md justify-center items-center`, {
                        backgroundColor: containerColor, color: color
                    }]} onPress={() => appendNumber(num)}>
                        <Text style={[
                            tailwind`text-3xl font-bold`,
                            { color, fontFamily: 'Lato-Bold' }
                        ]}>{num}</Text>
                    </TouchableOpacity>
                ))}
                {['+', '-', 'x', '÷'].map((op) => (
                    <TouchableOpacity key={op} style={[tailwind`m-2 w-[70px] h-[70px] rounded-md justify-center items-center`, {
                        backgroundColor: containerColor, color: color
                    }]} onPress={() => chooseOperation(op)}>
                        <Text style={[
                            tailwind`text-3xl font-bold`,
                            { color, fontFamily: 'Lato-Bold' }
                        ]}>{op}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={[tailwind`m-2 w-[70px] h-[70px] rounded-md justify-center items-center`, {
                    backgroundColor: containerColor, color: color
                }]} onPress={() => calculate()}>
                    <Text style={[
                        tailwind`text-3xl font-bold`,
                        { color, fontFamily: 'Lato-Bold' }
                    ]}>=</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    display: {
        fontSize: 48,
        textAlign: 'right',
        margin: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding:10,
        justifyContent:"center"
    },
});