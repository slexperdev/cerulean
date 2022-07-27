import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FrmButton from '../components/FrmButton';
import FrmInput from '../components/FrmInput';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confrimPassword, setConfirmPassword] = useState();
  //   const [firstName, setFirstName] = useState();
  //   const [lastName, setLastName] = useState();

  const {register} = useContext(AuthContext);

  const handleSignup = () =>{
    if(confrimPassword!=password){
      alert("Password not match!");
    }else{
      register(email,password);
      alert('user registered!')
    }
  }

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/2992779.jpg')} style={styles.logo} /> */}
      <Text style={styles.text}>Creata an Account</Text>

      {/* <FrmInput
        labelValue={firstName}
        onChangeText={e => setFirstName(e)}
        placeholderText="First Name"
        iconType="user"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <FrmInput
        labelValue={lastName}
        onChangeText={e => setLastName(e)}
        placeholderText="Last Name"
        iconType="user"
        autoCorrect={false}
        autoCapitalize="none"
      /> */}

      <FrmInput
        labelValue={email}
        onChangeText={e => setEmail(e)}
        placeholderText="Email"
        iconType="mail"
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

      <FrmInput
        labelValue={confrimPassword}
        onChangeText={e => setConfirmPassword(e)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FrmButton btnTitle="Sign Up" onPress={()=> handleSignup()} />

      <SocialButton
        btnTitle='Sign In with Google'
        btnType='google'
        color='#de4d41'
        backgroundColor='#f5e7ea'
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          You already have an accout? Login{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  text: {
    fontSize: 25,
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
