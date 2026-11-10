import "@/global.css"
import { Image, Text, View, ScrollView } from "react-native";
import images from "@/constants/images"
import { USER } from "@/constants/data"
import { components } from "@/constants/theme"

import { useSafeAreaInsets, SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"
import { styled } from "nativewind";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const insets = useSafeAreaInsets();
  const privilegeLabels = ["Child", "Parent", "Clinician", "Dev"];
  const status = privilegeLabels[USER.privilege] ?? "???";

  return (
    <ScrollView
      className="size-fit bg-background"
      contentContainerStyle={{
        paddingBottom: components.tabBar.height + Math.max(insets.bottom, components.tabBar.horizontalInset),
      }}
    >
      <SafeAreaView className="flex-1 p-6">
        <View className="home-top">
          <Image source={images.brand} className="home-brand" accessibilityHint="App Logo"></Image>
          <Text className="home-status">{status}</Text>
        </View>
        <Text className="home-greeting">Lets practice, {USER.name}!</Text>
        <Text className="home-subtext">{'> Make room for how you feel today :)'}</Text>
        <View className="bg-pastel-green w-max h-100 mt-10 md:mx-[clamp(10%,20,15%)] rounded-4xl border-border border-3">

        </View>
        <View className="bg-white w-max h-70 mt-10 md:mx-[clamp(10%,20,15%)] rounded-4xl border-border border-3">

        </View>
        <View className="bg-pastel-yellow w-max h-50 mt-10 md:mx-[clamp(10%,20,15%)] rounded-4xl border-border border-3">
          
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}