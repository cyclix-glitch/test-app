import { View, Image, Text, type ColorValue } from 'react-native';
import { Tabs } from "expo-router"
import { tabs } from "@/constants/data"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import clsx from "clsx"

import { colors,components,spacing } from "@/constants/theme"
import "@/global.css"

const tabBar = components.tabBar;

const TabsLayout = () => {
    const insets = useSafeAreaInsets();
    const TabIcon = ({focused,icon,color}:TabIconProps & {color: ColorValue}) => {
        return (<View className = "tabs-icon">
            <View className = {clsx('tabs-pill',focused && 'tabs-active')}>
                <Image source = {icon} resizeMode="contain" className = "tabs-glyph" style={{tintColor: color}}/>
            </View>
        </View>)
    }
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
        tabBarLabelStyle:{
            fontFamily: "ui-rounded"
        }
        }}>

        {tabs.map((tab) => (
            <Tabs.Screen key = {tab.name} name = {tab.name} options = {{
                title: tab.title,
                tabBarIcon: ({focused, color}) => (
                    <TabIcon focused = {focused} icon = {tab.icon} color = {color} />
                ),
                tabBarLabel: ({focused, color}) => (
                    <Text style={{color, fontWeight: focused ? "700" : "500"}}>
                        {tab.title}
                    </Text>
                ),
            }}/>

        ))}
    </Tabs>
    );
}

export default TabsLayout;