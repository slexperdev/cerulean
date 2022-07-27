import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment';
import LikesButton from './LikesButton';

import Feather from 'react-native-vector-icons/Feather';

const Card = ({item, onDelete}) => {
  const {user, logout} = useContext(AuthContext);

  const [like,setLike] = useState(false);

//   redLikeIcon = item.redliked ? 'heart' : 'heart-o';
//   blueLikeIcon = item.blueliked ? 'heart' : 'heart-o';

  return (
    <View style={styles.container}>
      <View style={styles.userinfo}>
        <Image style={styles.userimg} source={item.userImg} />
        <View style={styles.userinfotext}>
          <Text style={styles.username}>{item.userName}</Text>
          <Text style={styles.postime}>{moment(item.postTime.toDate()).fromNow()}</Text>
        </View>
      </View>
      <Text style={styles.caption}>{item.post}</Text>
      {item.postImg != null ? (
        <Image style={styles.postimg} source={{uri: item.postImg}} />
      ) : (
        <View style={styles.devider}></View>
      )}

      <View style={styles.likesection}>
        
        {user &&  <LikesButton id={item.id} redlikes={item.redlikes} />}
        <TouchableOpacity style={styles.interaction} onPress={()=>setLike(!like)}>
          <FontAwesome name={`heart${!like?"-o" : ""}`} color={!like? "#808080" :'red'} size={20} />
          <Text style={styles.interactiontext}>{item.redlikes}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.interaction}>
          <FontAwesome name={blueLikeIcon} color="blue" size={20} />
          <Text style={styles.interactiontext}>{item.bluelikes}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.interaction}>
          <FontAwesome name="comment-o" size={20} />
          <Text style={styles.interactiontext}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interaction}>
          <Feather name="navigation-2" size={20} />
          <Text style={styles.interactiontext}>{item.comments}</Text>
        </TouchableOpacity>
        {user.uid==item.userId ?
        <TouchableOpacity style={styles.interaction} onPress={()=>onDelete(item.id)}>
          <FontAwesome name="trash" size={20} />
        </TouchableOpacity>
        :null
        }
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
  },
  userinfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  userimg: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  userinfotext: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
  },
  postime: {
    fontSize: 12,
    color: '#666',
  },
  caption: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },
  postimg: {
    width: '100%',
    height: 250,
    marginTop: 15,
  },
  likesection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
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
  devider: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width: '92%',
    alignSelf: 'center',
    marginTop: 15,
  },
});
