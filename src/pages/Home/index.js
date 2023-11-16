import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

    await axios.post(apiURL + 'menu').then(res => {

      console.log(res.data);
      setData(res.data);

    });
  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flexDirection: 'row',
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          margin: 5,
          height: windowHeight / 8,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            flex: 0.35,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }} />
          <Text style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            fontSize: 18,
            color: colors.secondary,
            // textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
      position: 'relative'
    }}>






      <View style={{
        paddingHorizontal: 10,
      }}>

        <View style={{
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/logo_datar.png')} style={{
              width: 180,
              resizeMode: 'contain',
              height: 50,
            }} />
            <View style={{
              paddingLeft: 10,
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                color: colors.black
              }}>Selamat datang,  </Text>
              <Text style={{
                fontFamily: fonts.secondary[800],
                fontSize: 15,
                color: colors.black
              }}>{user.nama_lengkap}</Text>
            </View>
          </View>

          <Text style={{
            fontFamily: fonts.secondary[800],
            color: colors.primary,
            fontSize: 20,
          }}>SITANDUK</Text>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 15,
            color: colors.secondary
          }}>SISTEM INFORMASI TANAH PENDUDUK</Text>
        </View>
      </View>

      <View style={{
        flex: 1,
        padding: 10,
      }}>

        <FlatList data={data} renderItem={__renderItem} />

      </View>
      {/* navigation bottom */}
      <View style={{
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: colors.secondary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home' color={colors.white} size={20} />
        </TouchableOpacity>





        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='person' color={colors.white} size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})