import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {



  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1500)
  }, []);


  return (
    <ImageBackground style={{
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Image source={require('../../assets/logo.png')} style={{
        width: windowWidth / 2,
        height: windowWidth / 2,
        resizeMode: 'contain'
      }} />

      <Text style={{
        marginTop: 20,
        fontFamily: fonts.primary[600],
        fontSize: 20,
      }}>SISTEM INFORMASI TANAH PENDUDUK</Text>

      <View style={{
        marginTop: 10,
        padding: 10,
      }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
