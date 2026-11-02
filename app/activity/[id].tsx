import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

const Activity = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-3xl">Activity Details: {id}</Text>
      <Link href="/(tabs)/activities">Go Back</Link>
    </View>
  );
};

export default Activity;
