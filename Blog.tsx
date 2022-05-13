import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Text, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getBlog, getComments } from './redux/slices/blogSlices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './redux/store';

type RootStackParamList = {
  BlogList: undefined
  Blog: { blogId: number };
};

type BlogProps = NativeStackScreenProps<RootStackParamList, 'Blog'>

export default function Blog({navigation, route}: BlogProps){
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if(route.params.blogId){
      dispatch(getBlog(route.params.blogId))
    }
  }, [route.params?.blogId])
  useEffect(() => {
    if (route.params.blogId) {
      dispatch(getComments(route.params.blogId));
    }
  },[])
  const blogPost = useSelector((state: AppState) => state.blogReducer.blogPost)
  const commentList = useSelector((state: AppState) => state.blogReducer.commentList)
  return (
    <ScrollView>
      <View style={{padding: 8}}>
        <Text style={[styles.blogPost]}>Recent Blog Post</Text>  
        <Text style={[styles.blogPost]}>Blog Post: {blogPost?.id}</Text>      
        <Text style={[styles.blogPost]}>Title: {blogPost?.title}</Text>      
        <Text style={[styles.blogPost]}>Description:</Text>      
        <Text style={[styles.blogPost]}>{blogPost?.body}</Text>      
        <View>
          <Text style={[styles.commentHeading]}>Comments:</Text>
          {commentList.map((item) => (
            <View style={[styles.comment]}>
              <Text style={{color: '#333'}}>{item.name}</Text>
            </View>
          ))}
        </View>      
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  comment: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 8 ,
    marginBottom: 10
  },
  commentHeading: {
    color: '#000',
    marginBottom: 12
  },
  flex: {
    display: 'flex',
  },
  blogPost: {
    color: '#232323',
    marginBottom: 10,
    fontSize: 18
  },
});

