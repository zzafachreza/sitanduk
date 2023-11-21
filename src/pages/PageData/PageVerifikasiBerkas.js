import { Image, Linking, SafeAreaView, StyleSheet, Text, Modal, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colors, fonts, windowHeight } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import { Icon } from 'react-native-elements'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';




export default function PageVerifikasiBerkas({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);


    const item = route.params;
    console.log(item)
    const [open, setOpen] = useState(false)
    const [kirim, setKirim] = useState({
        nm_wp_sppt: '',
        alamat_wp: '',
        nop: '',
    });

    const [upd, setUpd] = useState({
        id_sppt: 0,
        kolom: '',
        value: ''
    })

    const [statusUpdate, setstatusUpdate] = useState('MENUNGGU');

    const updaBerkas = () => {
        axios.post(apiURL + 'update_berkas', {
            status_sppt: statusUpdate,
            id_sppt: data.id_sppt
        }).then(res => {
            setData(res.data.data);
            setOpen(true)
            showMessage({
                type: 'success',
                message: 'Status SPPT berhasil di update !'
            })


        })
    }
    const [data, setData] = useState({
        id_sppt: 0
    });

    const [tmp, setTmp] = useState({});

    const sendUPT = () => {
        console.log(upd);
        axios.post(apiURL + 'update_berkas_detail', upd).then(res => {
            setData(res.data.data);
            setOpen(true)
            showMessage({
                type: 'success',
                message: kolom + ' berhasil di update !'
            });
            setModalVisible(false);
        })
    }

    const sendServer = () => {
        axios.post(apiURL + 'cari_berkas', kirim).then(res => {
            console.log(res.data);

            if (res.data.status == 404) {
                showMessage({
                    type: 'danger',
                    message: res.data.message
                })
            } else {
                setData(res.data.data);
                setTmp(res.data.data);
                setOpen(true)
            }
        })
    }


    const MYListData = ({ idx, label, value, pdf = false }) => {
        let kolom = Object.keys(data)[idx];
        return (
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                paddingVertical: 4,
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>{label}</Text>
                {!pdf && <>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: 15,
                        }}>{value}</Text>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(true)
                            setUpd({
                                value: value,
                                kolom: kolom,
                                id_sppt: data.id_sppt
                            })
                        }}>
                            <Icon type='ionicon' name='create' />
                        </TouchableOpacity>
                    </View>

                </>}

                {pdf && value.length > 0 && <View style={{
                    flex: 0.4,
                }}>
                    <MyButton warna={colors.danger} title="Lihat File" onPress={() => {
                        Linking.openURL(webURL + value)
                    }} />
                </View>}

                {pdf && value.length == 0 && <View style={{

                }}>
                    <TouchableOpacity onPress={() => {
                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 400,
                            maxHeight: 400
                        }, response => {
                            // console.log('All Response = ', response);

                            axios.post(apiURL + 'update_berkas_detail', {
                                kolom: kolom,
                                img: 1,
                                id_sppt: data.id_sppt,
                                value: `data:${response.type};base64, ${response.base64}`,
                            }).then(res => {
                                setData(res.data.data);
                                setOpen(true)
                                showMessage({
                                    type: 'success',
                                    message: kolom + ' berhasil di update !'
                                });
                            })
                        });
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            textAlign: 'center',
                            color: colors.border
                        }}>Tidak ada file</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 9,
                            textAlign: 'center',
                            color: colors.black
                        }}>Tap untuk upload</Text>
                    </TouchableOpacity>

                </View>}
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            // padding: 10,
        }}>
            <View style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.primary,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',

            }}>

                <Image source={{
                    uri: item.image
                }} style={{
                    // flex: 1,
                    width: 40,
                    height: 40,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 18,
                    color: colors.secondary,
                    textAlign: 'center'
                }}>{item.judul}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 10,
            }}>
                <MyInput onChangeText={x => {
                    setKirim({
                        ...kirim,
                        nm_wp_sppt: x
                    })
                }} label="Nama Lengkap" />
                <MyInput onChangeText={x => {
                    setKirim({
                        ...kirim,
                        alamat_wp: x
                    })
                }} label="Alamat" />
                <MyInput onChangeText={x => {
                    setKirim({
                        ...kirim,
                        nop: x
                    })
                }} label="Nomor Object Pajak PBB" />
                <MyGap jarak={10} />
                <MyButton title="Cari Berkas" Icons="search" warna={colors.primary} onPress={sendServer} />

                {open && <View style={{
                    padding: 10,
                    marginTop: 10,
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyPicker onValueChange={x => {
                                setstatusUpdate(x)
                            }} label="Status SPPT" data={[
                                { label: 'MENUNGGU', value: 'MENUNGGU' },
                                { label: 'PROSES', value: 'PROSES' },
                                { label: 'SELESAI', value: 'SELESAI' },
                            ]} />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 5,
                            paddingTop: 20,
                        }}>
                            <MyButton warna={colors.success} title="Update Status" Icons="create" onPress={updaBerkas} />
                        </View>
                    </View>
                    <MYListData label="status sppt" value={data.status_sppt} />
                    <MYListData idx={1} label="keterangan" value={data.keterangan} />
                    <MYListData idx={2} label="nop" value={data.nop} />
                    <MYListData idx={3} label="thn pajak sppt" value={data.thn_pajak_sppt} />
                    <MYListData idx={4} label="tgl jatuh tempo pembayaran" value={data.tgl_jatuh_tempo_pembayaran} />
                    <MYListData idx={5} label="nm wp sppt" value={data.nm_wp_sppt} />
                    <MYListData idx={6} label="pbb yg harus dibayar sppt" value={data.pbb_yg_harus_dibayar_sppt} />
                    <MYListData idx={7} label="status" value={data.status} />
                    <MYListData idx={8} label="nm kecamatan" value={data.nm_kecamatan} />
                    <MYListData idx={9} label="nm kelurahan" value={data.nm_kelurahan} />
                    <MYListData idx={10} label="tgl cetak sppt" value={data.tgl_cetak_sppt} />
                    <MYListData idx={11} label="alamat wp" value={data.alamat_wp} />
                    <MYListData idx={12} label="alamat op" value={data.alamat_op} />
                    <MYListData idx={13} label="nm jpb" value={data.nm_jpb} />
                    <MYListData idx={14} label="rw op" value={data.rw_op} />
                    <MYListData idx={15} label="rt op" value={data.rt_op} />
                    <MYListData idx={16} pdf label="scan surat pengantar rt rw" value={data.scan_surat_pengantar_rt_rw} />
                    <MYListData idx={17} pdf label="scan ktp dan kk" value={data.scan_ktp_dan_kk} />
                    <MYListData idx={18} pdf label="scan sertipikat rumah" value={data.scan_sertipikat_rumah} />
                    <MYListData idx={19} pdf label="scan akta jual beli" value={data.scan_akta_jual_beli} />
                    <MYListData idx={20} pdf label="scan nop" value={data.scan_nop} />
                    <MYListData idx={21} pdf label="scan ktp saksi 2 orang" value={data.scan_ktp_saksi_2_orang} />
                    <MYListData idx={22} pdf label="scan surat pernyataan status tanah tidak sengketa" value={data.scan_surat_pernyataan_status_tanah_tidak_sengketa} />
                    <MYListData idx={23} pdf label="scan surat pernyataan penguasaan fisik bidang tanah" value={data.scan_surat_pernyataan_penguasaan_fisik_bidang_tanah} />
                    <MYListData idx={24} pdf label="scan foto rumah" value={data.scan_foto_rumah} />
                </View>}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    backgroundColor: '#00000086',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10,

                }}>
                    <View style={{
                        height: windowHeight / 2,
                        backgroundColor: colors.white,
                        borderRadius: 10,
                        padding: 10,
                    }}>
                        <MyInput value={upd.value} onChangeText={x => {
                            setUpd({
                                ...upd,
                                value: x
                            })
                        }} />
                        <MyGap jarak={10} />
                        <MyButton onPress={sendUPT} title="Simpan" />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})