// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import { Alert } from 'react-native';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Firestone
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import { useEffect, useState } from 'react';

import { useNetInfo } from '@react-native-community/netinfo';

import { getStorage } from "firebase/storage";



// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyAAblow31iPnpTIJDUmp_08zsj4UE9LRfg",
    authDomain: "chatapp-adc52.firebaseapp.com",
    projectId: "chatapp-adc52",
    storageBucket: "chatapp-adc52.appspot.com",
    messagingSenderId: "806297388414",
    appId: "1:806297388414:web:90dc06281ea5b4eba05f2f",
    measurementId: "G-6PJF636Q4B"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  //Network Status
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected])


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat 
          isConnected={connectionStatus.isConnected}
          db={db}
          storage={storage}
          {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;