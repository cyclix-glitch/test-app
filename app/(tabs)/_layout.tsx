import {
    View,
    Image,
    Text,
    Animated
} from 'react-native';
import { Tabs } from "expo-router"
import { tabs } from "@/constants/data"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { clsx } from "clsx"

import { colors,components,spacing } from "@/constants/theme"
import "@/global.css"

const tabBar = components.tabBar;

const TabsLayout = () => {
    const insets = useSafeAreaInsets();

    return (
    <Tabs screenOptions={{
        headerShown:false,
        //tabBarShowLabel:false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subtext,
        
        tabBarStyle:{
            position: "absolute",
            bottom: Math.max(insets.bottom, tabBar.horizontalInset),
            height: tabBar.height,
            marginHorizontal: tabBar.horizontalInset,

            borderRadius: tabBar.radius,
            backgroundColor: colors.card, //Use my global.css variable for background color
            borderColor: colors.border,

            borderWidth: spacing[.5],
            borderTopWidth: spacing[.5],
            elevation: 1,
        },
        tabBarItemStyle:{
            paddingVertical: spacing[0],
        },
        tabBarIconStyle:{
            width: tabBar.iconFrame,
            height: tabBar.iconFrame,
            alignItems: "center",
        },
        }}>

        {tabs.map((tab) => (
            <Tabs.Screen key = {tab.name} name = {tab.name} options = {{
                title: tab.title,
                tabBarIcon: ({focused}) => (
                    <Animated.View className = "tabs-icon">
                        <View className = {clsx('tabs-pill',focused?'tabs-pill-active':null)}>
                            <Image source={tab.icon} resizeMode="contain" style={{ width: 32, height: 32, tintColor: focused ? colors.text : colors.subtext }}/>
                        </View>
                    </Animated.View>
                ),
                tabBarLabel: ({focused}) => (
                    <Text className = {clsx("tabs-label",focused?"tabs-label-active":null)}>
                        {tab.title}
                    </Text>
                ),
            }}/>

        ))}
    </Tabs>
    );
}

export default TabsLayout;