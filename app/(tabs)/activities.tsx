import { View } from "react-native";
import { Link } from "expo-router";
 
const Activities = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
        <Link
          href={{
            pathname:"/activity/[id]",
            params:{id:"test-id"}
          }}className="mt-4 rounded bg-black text-white p-4">
            Test Activity 2
        </Link>
    </View>
    );
};

export default Activities;