import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getBlogList } from './redux/slices/blogSlices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './redux/store';

type RootStackParamList = {
  BlogList: undefined
  Blog: { blogId: number };
};

type BlogList = NativeStackScreenProps<RootStackParamList, 'BlogList'>

export default function BlogList({navigation, route}: BlogList) {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getBlogList(1))
  }, [])
  const blogList = useSelector((state: AppState) => state.blogReducer.blogList)
  return (
    <ScrollView>
      <View>
        <View style={[styles.blogListContainer, styles.flex]}>
        {blogList?.map((blogItem) => {
          return (
            <View>
            <View style={[styles.blogContainer]}>
              <View>
                <Text>{blogItem.title}</Text>
              </View>
              <View style={{marginTop: 5, marginBottom: 5}}>
                <TouchableOpacity style={{borderColor: '#fff', borderWidth: 1, padding: 5}} onPress={() => navigation.navigate({name: 'Blog', params: {blogId: blogItem.id}})}>
                  <Text>Read more....</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          );
        })}
      </View>
      </View>
     </ScrollView>
  );
}
const styles = StyleSheet.create({
  blogContainer: {
    backgroundColor: 'orange',
    color: '#333',
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 12,
    paddingLeft: 12
  },
  blogListContainer: {
    flex: 1
  },
  flex: {
    display: 'flex',
  },
});

