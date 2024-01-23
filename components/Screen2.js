import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Screen2 = ({ route, navigation }) => {

  const { name, backgroundColor } = route.params;


  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

 return (
  <View style={[styles.container, { backgroundColor }]}>
  <Text style={styles.text}>Welcome, {name}!</Text>
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

export default Screen2;