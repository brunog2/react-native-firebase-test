import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';

const App: () => React$Node = () => {
  const [textEmail, setTextEmail] = useState('');
  const [textPassword, setTextPassword] = useState('');

  const authUser = () => {
    console.log("autenticar")
    auth()
      .signInWithEmailAndPassword(textEmail, textPassword)
      .then(() => {
        console.log('User account created & signed in!');
        
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const createUser = () => {
    console.log("criar conta");
    auth()
      .createUserWithEmailAndPassword(textEmail, textPassword)
      .then(() => {
        console.log('User account created & signed in!');
        Alert.alert("Sucesso!", "Conta criada com sucesso! Agora o usuário está logado.", [{text: "OK"}])
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert("Erro!", "O email já está em uso!", [{text: "OK"}])
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert("Erro!", "Email inválido!", [{text: "OK"}])
        }

        console.error(error);
      });
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.containerForm}>
          <Text style={styles.title}>:)</Text>
          <TextInput autoCapitalize="none" autoCompleteType="email" value={textEmail} onChangeText={(text) => setTextEmail(text)} placeholder="Email" style={styles.textInput}></TextInput>
          <TextInput secureTextEntry={true} autoCapitalize="none" autoCompleteType="off" value={textPassword} onChangeText={(text) => setTextPassword(text)} placeholder="Senha" style={styles.textInput}></TextInput>
          <TouchableOpacity style={styles.btPrimary}>
            <Text style={styles.textBtPrimary}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btSecondary} onPress={() => createUser()}>
            <Text style={styles.textBtSecondary}>Criar conta</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
    color: "#ffaa00",
  },
  containerForm: {
    width: "85%",
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginBottom: 5,
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#ffaa00",
  },
  btPrimary: {
    marginTop: 10,
    marginBottom: 5,
    width: "100%",
    height: 45,
    borderRadius: 7,
    backgroundColor: "#ffaa00",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtPrimary: {
    fontSize: 16,
    color: "#FFF"
  },
  btSecondary: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtSecondary: {
    color: "#ffaa00",
    fontSize: 16
  }
});

export default App;
