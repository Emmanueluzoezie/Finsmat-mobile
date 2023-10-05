import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import BottomItem from './BottomItem'
import { Entypo, Ionicons, FontAwesome5, MaterialIcons, Foundation, Octicons, FontAwesome } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { selectAppTheme, setCurrentScreen } from '../slice/AppSlices'
import { appColor } from './AppColor'

const BottomNavigationContainer = () => {
    const appTheme = useSelector(selectAppTheme)
    const [loadingComponent, setLoadingComponent] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()

    const handleNavigation = (clickedItem: string) => {
        dispatch(setCurrentScreen(clickedItem));
        navigation.navigate(clickedItem, { previousScreen: route.name });
    };

    const bgColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    useEffect(() => {

    },[])

    return (
        <View style={[tailwind` pt-2 pb-6 flex-row justify-between items-center`,
        { backgroundColor: bgColor }
        ]}>
            <View style={[tailwind`w-[75px]`]}>
                <BottomItem
                    Icon={MaterialIcons}
                    name="dashboard"
                    onPress={() => handleNavigation("home")}
                    title="Dashboard"
                    active="home"
                    size={16}
                />
            </View>
            <View style={[tailwind`w-[75px]`]}>
                <BottomItem
                    Icon={FontAwesome}
                    name="question-circle"
                    onPress={() => handleNavigation("quiz")}
                    title="Quiz"
                    active="quiz"
                    size={16}
                />
            </View>
            <View style={[tailwind`w-[75px]`]}>
                <BottomItem
                    Icon={Octicons}
                    name="list-ordered"
                    onPress={() => handleNavigation("leaderboard")}
                    title="Leader"
                    active="leaderboard"
                    size={16}
                />
            </View>
            <View style={[tailwind`w-[75px]`]}>
                <BottomItem
                    Icon={Entypo}
                    name="tools" 
                    onPress={() => handleNavigation("tools")}
                    title="Tools"
                    active="tools"
                    size={16}
                />
            </View>
            <View style={[tailwind`w-[75px]`]}>
                <BottomItem
                    Icon={Ionicons}
                    name="settings"
                    onPress={() => handleNavigation("settings")}
                    title="Settings"
                    active="settings"
                    size={16}
                />
            </View>
        </View>
    )
}

export default BottomNavigationContainer