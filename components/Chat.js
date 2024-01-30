import React, { useEffect, useState } from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, userID } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {    
    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          });
        });
        setMessages(newMessages);
        // Cache messages in AsyncStorage
        AsyncStorage.setItem('cachedMessages', JSON.stringify(newMessages));
      });

      return () => {
        if (unsubMessages) unsubMessages();
      };
    } else {
      // Load cached messages from AsyncStorage when offline
      AsyncStorage.getItem('cachedMessages')
        .then((cachedMessages) => {
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          }
        })
        .catch((error) => {
          console.error("Error loading cached messages:", error);
        });
    }
  }, [isConnected]);

  

  const onSend = (newMessages) => {
    if (isConnected) {
      addDoc(collection(db, "messages"), newMessages[0])
        .catch((error) => {
          console.error("Error adding message:", error);
          Alert.alert("Error sending message. Please try again.");
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
      <View style={[styles.container, { flex: 1, backgroundColor }]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          onSend={messages => onSend(messages)}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          user={{
            _id: userID,
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
    },
  });

export default Chat;
