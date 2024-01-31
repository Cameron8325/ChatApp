import React, { useEffect, useState } from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, id } = route.params;

  let unsubMessages;

  // Set the chat screen title to the user's name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Effect to handle real-time updates of messages when online
  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        // Cache the new messages and update the stat
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
      // Load cached messages when offline
    } else loadCachedMessages();
    // Cleanup: Unsubscribe from real-time updates when the component is unmounted
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  // Load cached messages if offline
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    if (isConnected) {
      addDoc(collection(db, "messages"), newMessages[0])
        .catch((error) => {
          console.error("Error adding message:", error);
        });
    } else {
      Alert.alert("You are currently offline. Message will be sent when online.");
    }
  };

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />;
  };

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  };

  // Render an action button in Inputfield
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Render a MapView if the currentMessage contains location data
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, margin: 6 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: id,
          name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Chat;
