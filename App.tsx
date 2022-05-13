/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import BlogList from './BlogList'
import Blog from './Blog'
import AlbumList from './AlbumList'
import Album from './Album'
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section: React.FC<{
//   title: string;
// }> = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };


type RootStackParamList = {
  Blog: { blogId: number };
  BlogList: undefined
  HomeScreen: undefined
  AlbumList: undefined
  Album: { albumId: number }
};


type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
type AlbumProps = NativeStackScreenProps<RootStackParamList, 'Album'>;
type BlogProps = NativeStackScreenProps<RootStackParamList, 'Blog'>
type AlbumList = NativeStackScreenProps<RootStackParamList, 'AlbumList'>
type BlogList = NativeStackScreenProps<RootStackParamList, 'BlogList'>
const RootStack = createStackNavigator<RootStackParamList>();

function HomeScreen({route, navigation}: Props) {
  return (
    <SafeAreaView style={[styles.flex, styles.centerLayout, styles.wrapper ]}>
      <View style={[styles.rowDirection, styles.content]}>
         <TouchableOpacity onPress={() => navigation.navigate('BlogList')} style={[styles.btnStyle]}>
           <Text>Visit Blog</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.btnStyle, styles.gapLeft]} onPress={() => navigation.navigate('AlbumList')}>
           <Text>Visit Album</Text>
         </TouchableOpacity>
       </View>
     </SafeAreaView>
  );
}





function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomeScreen">
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen name="BlogList" component={BlogList} />
        <RootStack.Screen name="Blog" component={Blog} />
        <RootStack.Screen name="AlbumList" component={AlbumList} />
        <RootStack.Screen name="Album" component={Album} />
      </RootStack.Navigator>
    </NavigationContainer>
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
  blogPost: {
    color: '#232323',
    marginBottom: 10,
    fontSize: 18
  },
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
  gapLeft: {
    marginLeft: 10
  },
  btnStyle: {
    borderColor: "#000",
    borderWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    color: "#000"
  },
  content: {
    width: '50%',
    justifyContent: 'space-between'
  },
  rowDirection: {
    flexDirection: 'row',
    
  },
  wrapper: {
    height: '100%'
  },
  flex: {
    display: 'flex',
  },
  centerLayout: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
