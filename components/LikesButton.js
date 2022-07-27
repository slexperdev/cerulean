import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const LikesButton = ({id,redlikes}) => {
    const {user, logout} = useContext(AuthContext);
    const [postData, setPostData] = useState(null);

    const [like,setLike] = useState(false);

    const getCurrentPost = async()=>{
        const currentUser = await firestore()
        .collection('posts')
        .doc(id)
        .get()
        .then((documentSnapshot)=>{
            setPostData(documentSnapshot.data())
            console.log(postData);
        })
    }
    
    const handleLikes =()=>{
    //    const likes =  getCurrentPost();
        setLike(!like);

    }
   
   useEffect(()=>{

   },)
    
  return (
    <View>
      <TouchableOpacity style={styles.interaction} onPress={handleLikes} >
          <FontAwesome name={`heart${!like?"-o" : ""}`} color={!like? "#808080" :'blue'} size={20} />
          <Text style={styles.interactiontext}></Text>
        </TouchableOpacity>
    </View>
  )
}

export default LikesButton;

const styles = StyleSheet.create({
    interaction: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
      },
      interactiontext: {
        fontSize: 12,
        justifyContent: 'center',
        color: '#333',
        marginTop: 5,
        marginLeft: 5,
      },
})