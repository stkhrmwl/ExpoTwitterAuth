import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// external components
import { useTwitter } from 'react-native-simple-twitter';

// secret keys
import ENV from './env.json';

export default function App() {

  const { twitter, TWModal } = useTwitter({
    onSuccess: (user, accessToken) => {
      console.log(user);
      console.log(accessToken);
    }
  });

  const onLoginPress = async () => {
    try {
      await twitter.login();
    } catch (e) {
      console.log(e.errors);
    }
  }

  useEffect(() => {
    twitter.setConsumerKey(ENV.TWITTER_API_KEY, ENV.TWITTER_API_SECRET_KEY);
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLoginPress}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </TouchableOpacity>
      <TWModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
