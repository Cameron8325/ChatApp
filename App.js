// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Firestone
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { useEffect } from 'react';



// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
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
          {props => <Chat db={db} {...props} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;