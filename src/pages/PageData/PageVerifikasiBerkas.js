import { Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { colors, fonts, windowHeight } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'



const MYListData = ({ label, value, pdf = false }) => {
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
            {!pdf && <Text style={{
                flex: 1,
                fontFamily: fonts.secondary[400],
                fontSize: 15,
            }}>{value}</Text>}

            {pdf && value.length > 0 && <View style={{
                flex: 0.4,
            }}>
                <MyButton warna={colors.danger} title="Lihat File" onPress={() => {
                    Linking.openURL(webURL + value)
                }} />
            </View>}

            {pdf && value.length == 0 && <View style={{

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    color: colors.border
                }}>Tidak ada file</Text>
            </View>}
        </View>
    )
}

export default function PageVerifikasiBerkas({ navigation, route }) {
    const item = route.params;
    console.log(item)
    const [open, setOpen] = useState(false)
    const [kirim, setKirim] = useState({
        nm_wp_sppt: '',
        alamat_wp: '',
        nop: '',
    });

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
                setOpen(true)
            }
        })
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
                            <MyButton warna={colors.success} title="Update Verifikasi" Icons="create" onPress={updaBerkas} />
                        </View>
                    </View>
                    <MYListData label="status_sppt" value={data.status_sppt} />
                    <MYListData label="keterangan" value={data.keterangan} />
                    <MYListData label="nop" value={data.nop} />
                    <MYListData label="thn_pajak_sppt" value={data.thn_pajak_sppt} />
                    <MYListData label="tgl_jatuh_tempo_pembayaran" value={data.tgl_jatuh_tempo_pembayaran} />
                    <MYListData label="nm_wp_sppt" value={data.nm_wp_sppt} />
                    <MYListData label="pbb_yg_harus_dibayar_sppt" value={data.pbb_yg_harus_dibayar_sppt} />
                    <MYListData label="status" value={data.status} />
                    <MYListData label="nm_kecamatan" value={data.nm_kecamatan} />
                    <MYListData label="nm_kelurahan" value={data.nm_kelurahan} />
                    <MYListData label="tgl_cetak_sppt" value={data.tgl_cetak_sppt} />
                    <MYListData label="alamat_wp" value={data.alamat_wp} />
                    <MYListData label="alamat_op" value={data.alamat_op} />
                    <MYListData label="nm_jpb" value={data.nm_jpb} />
                    <MYListData label="rw_op" value={data.rw_op} />
                    <MYListData label="rt_op" value={data.rt_op} />
                    <MYListData pdf label="scan_surat_pengantar_rt_rw" value={data.scan_surat_pengantar_rt_rw} />
                    <MYListData pdf label="scan_ktp_dan_kk" value={data.scan_ktp_dan_kk} />
                    <MYListData pdf label="scan_sertipikat_rumah" value={data.scan_sertipikat_rumah} />
                    <MYListData pdf label="scan_akta_jual_beli" value={data.scan_akta_jual_beli} />
                    <MYListData pdf label="scan_nop" value={data.scan_nop} />
                    <MYListData pdf label="scan_ktp_saksi_2_orang" value={data.scan_ktp_saksi_2_orang} />
                    <MYListData pdf label="scan_surat_pernyataan_status_tanah_tidak_sengketa" value={data.scan_surat_pernyataan_status_tanah_tidak_sengketa} />
                    <MYListData pdf label="scan_surat_pernyataan_penguasaan_fisik_bidang_tanah" value={data.scan_surat_pernyataan_penguasaan_fisik_bidang_tanah} />
                    <MYListData pdf label="scan_foto_rumah" value={data.scan_foto_rumah} />
                </View>}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})