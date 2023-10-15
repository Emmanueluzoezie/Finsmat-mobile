import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'twrnc';
import { selectAppTheme } from '../../slice/AppSlices';
import { appColor } from '../AppColor';

export default function Test() {
    const appTheme = useSelector(selectAppTheme)
    

    const containerColor = appTheme === "dark"? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor 

    const buttonColor = appTheme === "dark"? appColor.primaryColor : appColor.primaryDarkColor

    const navigateToQuiz = () => {
        // Navigate to the Quiz screen
        console.log('Navigating to Quiz Screen');
    };

    return (
        // <View style={styles.container}>
        //     <View style={styles.quizCTAContainer}>
        //         <Text style={styles.quizCTATitle}>Ready to Test Your Financial IQ?</Text>
        //         <Text style={styles.quizCTADescription}>
        //             Take our quiz and earn a badge for mastering personal finance!
        //         </Text>
        //         <TouchableOpacity style={styles.quizCTAButton} onPress={navigateToQuiz}>
        //             <Text style={styles.quizCTAButtonText}>Start Quiz</Text>
        //         </TouchableOpacity>
        //     </View>
        // </View>
       <View style={tailwind`p-4`}>
            <View style={[
                tailwind`p-3 rounded-md`,
                { backgroundColor: appColor.primaryDarkColor }
            ]}>
                <Text style={[
                    tailwind`text-lg font-semibold`,
                    {color}
                ]}>Welcome <Text style={tailwind`font-bold capitalize`}>emmanuel</Text> to Finance Wise</Text>
                <Text style={[
                    tailwind`text-[15px] py-2`,
                    { color }
                ]}>You now have 20 coins for the telling us what you like spending on often.</Text>
                <Text style={[
                    tailwind`text-[15px]`,
                    { color }
                ]}>Take our quiz and earn 100 coins to able join the quiz board</Text>
                <View style={tailwind`justify-center flex-row mt-3`}>
                    <TouchableOpacity style={[tailwind``, { backgroundColor: buttonColor }]}>
                        <Text style={[tailwind` font-semibold p-1 px-4`, 
                    {
                        color: appTheme === "dark"? appColor.darkTextColor : appColor.lightTextColor
                    }]}>Get started</Text>
                    </TouchableOpacity>
                </View>
            </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quizCTAContainer: {
        backgroundColor: '#f1f1f1',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    quizCTATitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    quizCTADescription: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    quizCTAButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    quizCTAButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});





