import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


import { AuthContext } from '../navigation/AuthProvider';

const AddPostScreen = () => {
  const {user, logout}= useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [post, setPost] = useState(null);

  const choosePhotofromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = image.sourceURL;
      setImage(imageUri);
    });
  };

  const handlePostSubmit = async ()=>{
    const imageUrl = await handleImageUpload();

    console.log(imageUrl);
    console.log(post);

    firestore()
    .collection('posts')
    .add({
      userId: user.uid,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      redlikes: [],
      bluelikes: [],
      comments: [],
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  const handleImageUpload = async ()=>{
    if(image==null){
      return null;
    }
    const uploadUri= image;

    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const work = storageRef.putFile(uploadUri);

    // Set transferred state
    work.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try{
      await work;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;
    }catch(err){
      console.log(err);
      return null;
    }

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.upload} onPress={choosePhotofromLibrary}>
        <Text>Upload Image</Text>
      </TouchableOpacity>
      <View style={styles.InputWrapper}>
        {image != null ? (
          <Image style={styles.image} source={{uri: image}} />
        ) : null}
        <TextInput
          placeholder="What's your caption?"
          style={styles.textinput}
          value={post}
          onChangeText={(content)=>setPost(content)}
          multiline
          numberOfLines={3}
        />
        
        {uploading ? (
          <View style={styles.status}>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <Button style={styles.btn} title="Post" onPress={handlePostSubmit} />
        )}
      </View>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2e64e515',
  },
  textinput: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
    width: '90%',
  },
  btn: {
    marginTop: 20,
  },
  upload: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    height: 22,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
  status:{
    justifyContent:'center',
    alignItems:'center'
  }
});
