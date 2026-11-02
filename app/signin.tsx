//import { router } from 'expo-router';
import { Button, View, Platform, Alert} from 'react-native';

export default function SignIn() {
  return (
    <View>
      <Button
      onPress={() => {
        if (Platform.OS === "web"){
          window.alert("Sign In button pressed");
        }else{
          Alert.alert("Sign In", "Sign In button pressed");
        }
      }}
      title="Click here"
      accessibilityLabel="Accessibility"
      />
    </View>
  );
}