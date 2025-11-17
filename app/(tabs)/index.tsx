import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '605266459772-rbng0aljk33a45t8furvvn7fgpskqhng.apps.googleusercontent.com',
  iosClientId: '605266459772-ubkfvkekhu5nm9kde7im6t1jpj2708a7.apps.googleusercontent.com'
});

const Index = () => {
  const [userInfo, setUserInfo] = React.useState<any>(null);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);

      if (isSuccessResponse(response)) {
        setUserInfo(response.data);
        console.log('Sign in successful', response.data);
      } else {
        // sign in was cancelled by user
        console.log('Sign in cancelled');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            Alert.alert('Sign in is in progress already');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            Alert.alert('Play services not available');
            break;
          default:
            // some other error happened
            Alert.alert('An unknown error occurred', error.message);
        };
      } else {
        // an error that's not related to google sign in occurred
        Alert.alert('An unknown error occurred');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text>Index</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
      {userInfo && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text>Welcome, {userInfo.user.name}</Text>
          <Text>Email: {userInfo.user.email}</Text>
        </View>
      )}  
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});