import "@/global.css"
import { Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-xl font-bold text-success text-center color-white">
        Tagline
      </Text>
    </View>
  );
}