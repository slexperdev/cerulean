import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import FrmButton from '../components/FrmButton';
import FrmInput from '../components/FrmInput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext); 

  // const handleLogin = () =>{
  //   if()
  // }

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/2992779.jpg')} style={styles.logo} /> */}
      <Text style={styles.text}>Cerulean</Text>

      <FrmInput
        labelValue={email}
        onChangeText={e => setEmail(e)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <FrmInput
        labelValue={password}
        onChangeText={e => setPassword(e)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FrmButton
        btnTitle="Sign In"
        onPress={()=> login(email,password)}
      />

      <SocialButton
        btnTitle='Sign In with Google'
        btnType='google'
        color='#de4d41'
        backgroundColor='#f5e7ea'
        onPress={()=> console.log('Clicked')}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={()=> navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>Don't have an account? Create </Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 400,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 40,
    marginBottom: 50,
    fontWeight: 'bold',
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});
