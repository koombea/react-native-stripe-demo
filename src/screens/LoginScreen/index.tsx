import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigatorParamList } from '../../components/StackNavigator/navigatorParamList';
 
const Login : React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList>>();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/stripe.png")} />
       <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email.."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
          value={email}
          keyboardType="email-address"
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
          keyboardType="default"
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => {
        if (!email || !password){
          Alert.alert('Please enter email and password')
        } else {
          navigation.replace('Home')}
        }}
        >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    width: 200,
    height: 110
  },
  inputView: {
    borderColor: "#9792fc",
    borderRadius: 10,
    borderWidth: 1,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#9792fc",
  },
  loginText: {
    color: "white",
  }
});

export default Login;