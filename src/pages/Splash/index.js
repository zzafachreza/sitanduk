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
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Login')
        } else {
          // navigation.replace('GetStarted')
          navigation.replace('Home')
        }
      })
    }, 1500)
  }, []);


  return (
    <ImageBackground style={{
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Image source={require('../../assets/logo_datar.png')} style={{
        width: windowWidth / 1.3,
        height: windowWidth / 3,
        resizeMode: 'contain'
      }} />

      <Text style={{
        marginTop: 20,
        fontFamily: fonts.normal,
        fontSize: 22,
        textAlign: 'center',
        maxWidth: '80%'
      }}>SISTEM INFORMASI TANAH PENDUDUK (SITANDUK)</Text>

      <View style={{
        marginTop: 20,
        padding: 10,
      }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
