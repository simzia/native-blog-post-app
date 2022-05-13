import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAlbumList } from './redux/slices/albumSlices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './redux/store';

type RootStackParamList = {
  AlbumList: undefined
  Album: { albumId: number }
};

type AlbumList = NativeStackScreenProps<RootStackParamList, 'AlbumList'>

export default function AlbumList({navigation, route}: AlbumList) {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAlbumList(1))
  }, [])
  const albumList = useSelector((state: AppState) => state.albumReducer.albumList);
  return (
    <ScrollView>
      <View>
        <View style={[styles.blogListContainer, styles.flex]}>
        {albumList?.map((item) => {
          return (
            <View>
            <View style={[styles.blogContainer]}>
              <View>
                <Text>{item.title}</Text>
              </View>
              <View style={{marginTop: 5, marginBottom: 5}}>
                <TouchableOpacity style={{borderColor: '#fff', borderWidth: 1, padding: 5, marginLeft: 'auto', marginRight: 'auto'}}  onPress={() => navigation.navigate({name: 'Album', params: {albumId: item.id}})}>
                  <Text>Visit Gallery</Text>
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

