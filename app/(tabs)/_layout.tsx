import { faHouse, faPerson , faStar } from '@fortawesome/free-solid-svg-icons';
import { Platform } from 'expo';
import { Tabs } from "expo-router"

const TabsLayout = () => {
    return (
    <Tabs screenOptions={{headerShown:true, tabBarActiveTintColor:"blue"}}>
        <Tabs.Screen name="index" options={{
            title:"index"}} />
        <Tabs.Screen name="homepage" options={{
            title:"Homepage"}} />
        <Tabs.Screen name="activities" options={{
            title:"Activities 2"}} />
    </Tabs>
    );
}

export default TabsLayout;