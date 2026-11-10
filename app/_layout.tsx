import { Stack } from "expo-router";
import "@/global.css"

export default function RootLayout() {
  //const [fontsLoaded] = useFonts({
    // Load your fonts here
    // For example:
    //"ui-rounded": require("../assets/fonts/ui-rounded.ttf"),
  //});

  //useEffect(() => {
  //  if (fontsLoaded) {
  //    SplashScreen.hideAsync()
  //  }
  //}, [fontsLoaded]);

  //if (!fontsLoaded) {
  //  return null;
  //}

  return <Stack screenOptions={{headerShown:false}} />;
}
