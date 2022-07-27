import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Card from '../components/Card';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const HomeScreen = () => {
  const [posts, setPost] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const fetchPost = async () => {
    try {
      const postList = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {
              userId,
              post,
              postImg,
              postTime,
              redlikes,
              bluelikes,
              comments,
              redliked,
              blueliked
            } = doc.data();
            postList.push({
              id: doc.id,
              userId,
              userName: 'Test name',
              userImg: require('../assets/pp.jpeg'),
              postTime: postTime,
              post,
              postImg,
              redliked,
              blueliked,
              redlikes,
              bluelikes,
              comments: comments,
            });
          });
        });
        
      setPost(postList);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  },[posts]);

  useEffect(() => {
    fetchPost();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => handleDeletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const handleDeletePost = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(err => {
                console.log('Error while deleting the image. ', err);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  const listHeader = () => {
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => <Card item={item} onDelete={handleDelete} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent:'center',
    // alignItems:'center',
    padding: 20,
  },
});
