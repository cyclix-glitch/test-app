//import { router } from 'expo-router';
import { Button, View, Platform, Alert} from 'react-native';

export default function SignUp() {
  return (
    <View className="flex-1 items-center justify-center">
      <Button
      onPress={() => {
        if (Platform.OS === "web"){
          window.alert("Sign Up button pressed");
        }else{
          Alert.alert("Sign Up", "Sign Up button pressed");
        }
      }}
      title="Click here"
      accessibilityLabel="Accessibility"
      />
    </View>
  );
}