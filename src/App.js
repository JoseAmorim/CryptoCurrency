import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Dimensions, View, Platform } from 'react-native';
import axios from 'axios'
import { SearchBar } from 'react-native-elements'
import Crypto from './components/Crypto';

let WIDTH = Dimensions.get('window').width

export default () => {
    const [cryptos, setCryptos] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const asyncFunction = async () => {
            const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                headers: {
                    'X-CMC_PRO_API_KEY': 'a2ee50d7-859f-41f9-a588-a71437b97c47'
                }
            })

            setCryptos(response.data.data)
            setSearchedData(response.data.data)
        }

        asyncFunction()
    }, [])
    
    const handleSearch = (search) => {
        let searched = cryptos.filter(item => {
            let text = item.name.toLowerCase()

            let searchedText = search.toLowerCase()

            return text.indexOf(searchedText) > -1
        })

        setSearch(search)

        setSearchedData(searched)
    }

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar placeholder='Type the crypto name here...'
                onChangeText={handleSearch}
                value={search}
                platform={Platform.OS === 'ios' ? 'ios': 'android'}
                containerStyle={{ width: '100%' }} />
            <FlatList extraData={cryptos}
                data={searchedData}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => <Crypto {...item} style={{ width: WIDTH }} />}
                ItemSeparatorComponent={() => <View style={{ borderWidth: 2, borderColor: '#888' }} />} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})