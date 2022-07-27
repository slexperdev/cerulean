import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import {  windowHeight } from '../utils/ScreenSizes';

const FrmButton = ({btnTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
        <Text style={styles.buttonText}>{btnTitle}</Text>
    </TouchableOpacity>
  )
}

export default FrmButton

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
      },
})