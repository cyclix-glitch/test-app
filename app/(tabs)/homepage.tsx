import "@/global.css"
import { Text, View } from "react-native";
import { Link } from "expo-router";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success text-center">
        Tagline
      </Text>
      <Link href="/(tabs)/activities" className="mt-4 rounded bg-black text-white p-4">Enter activities page</Link>
    </View>
  );
}