import "@/global.css"
import { Text, View } from "react-native";
import { Link } from "expo-router";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success text-center">
        Welcome to Nativewind!{"\n"}
        Yohohoho
      </Text>
      <Link href="/explore" className="mt-4 rounded bg-black text-white p-4">Explore Upcoming Events</Link>
      <Link href="/signin" className="mt-4 rounded bg-black text-white p-4">Sign In</Link>
    </View>
  );
}