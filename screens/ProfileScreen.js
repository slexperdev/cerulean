import {  StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import FrmButton from '../components/FrmButton'
import { AuthContext } from '../navigation/AuthProvider';

const ProfileScreen = () => {
  const {logout}= useContext(AuthContext);
  return (
    <View style={styles.container}>
      <FrmButton
        btnTitle='Logout'
        onPress={()=>logout()}
      />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      padding:20,
  }
}
)