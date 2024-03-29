import { useState } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

const Start = ({ navigation }) => {
  const auth = getAuth();


  const [name, setName] = useState('');
  const [background, setBackground] = useState();

  const imgBackground = require('../img/bg-img.png')

  // Function to sign in user anonymously
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", { name: name, backgroundColor: background, id: result.user.uid });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.container}>
          <ImageBackground source={imgBackground} style={styles.image}>
            <Text style={styles.title}>Native Chat App</Text>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
                style={[styles.textInput, name && styles.blackText]}
              ></TextInput>

              <View>
                <Text style={styles.chooseBgText}>Choose Background Color</Text>
                <View style={styles.colorButtonBox}>

                  <TouchableOpacity
                    style={[styles.colorButton, styles.colorInput1]}
                    onPress={() => {
                      setBackground(styles.colorInput1.backgroundColor);
                    }}
                    accessible={true}
                    accessibilityLabel="Choose black background"
                    accessibilityHint="Select to set the background color to black."
                    accessibilityRole="button"
                  ></TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.colorButton, styles.colorInput2]}
                    onPress={() => {
                      setBackground(styles.colorInput2.backgroundColor);
                    }}
                    accessible={true}
                    accessibilityLabel="Choose dark gray background"
                    accessibilityHint="Select to set the background color to dark gray."
                    accessibilityRole="button"
                  ></TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.colorButton, styles.colorInput3]}
                    onPress={() => {
                      setBackground(styles.colorInput3.backgroundColor);
                    }}
                    accessible={true}
                    accessibilityLabel="Choose light gray background"
                    accessibilityHint="Select to set the background color to light gray."
                    accessibilityRole="button"
                  ></TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.colorButton, styles.colorInput4]}
                    onPress={() => {
                      setBackground(styles.colorInput4.backgroundColor);
                    }}
                    accessible={true}
                    accessibilityLabel="Choose beige background"
                    accessibilityHint="Select to set the background color to beige."
                    accessibilityRole="button"
                  ></TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={signInUser}>
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    marginBottom: 250,
  },
  inputBox: {
    height: "44%",
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-evenly",
    borderRadius: 15, // Add rounded corners
    padding: 20, // Add padding for a softer look
  },
  textInputContainer: {
    width: "100%", // Full width to maintain border around textInput
    marginBottom: 15,
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  chooseBgText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "center", // Center the text
    marginBottom: 10, // Adjust margin
  },
  blackText: {
    color: 'black',
  },
  colorButtonBox: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-evenly",
    marginRight: 25,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorInput1: {
    backgroundColor: "#090C08",
  },
  colorInput2: {
    backgroundColor: "#474056",
  },
  colorInput3: {
    backgroundColor: "#8A95A5",
  },
  colorInput4: {
    backgroundColor: "#B9C6AE",
  },
  button: {
    backgroundColor: "#757083",
    width: "88%",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});



export default Start;