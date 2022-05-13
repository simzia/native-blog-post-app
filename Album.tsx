import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAlbum } from './redux/slices/albumSlices';
import { ReactReduxContextValue, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './redux/store';
import { createStackNavigator } from '@react-navigation/stack';

type RootStackParamList = {
  Album: { albumId: number }
};

type AlbumProps = NativeStackScreenProps<RootStackParamList, 'Album'>;

export default function Album( { navigation, route }: AlbumProps){
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if(route.params.albumId){
      dispatch(getAlbum(route.params.albumId))
    }
  }, [route.params.albumId])
  const album = useSelector((state: AppState) => state.albumReducer.album);
  return (
    <ScrollView>
      <View style={{padding: 8}}>
         
        <View>
          {album?.map((item) => (
            <View style={[styles.comment]}>
               <Image
                source={{uri: item.thumbnailUrl}}
                style={{height: 100, width: 100}}
              />
              <Text style={{color: '#333'}}>{item.title}</Text>
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

