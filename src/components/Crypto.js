import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default (props) => {
    const [percent24h, setPercent24h] = useState()
    const [percent7d, setPercent7d] = useState()
    const [price, setPrice] = useState()

    useEffect(() => {
        let p24h = props.quote.USD.percent_change_24h
        setPercent24h(p24h.toFixed(2))
        let p7d = props.quote.USD.percent_change_7d
        setPercent7d(p7d.toFixed(2))
        let p = props.quote.USD.price
        setPrice(p.toFixed(2))
    }, [])

    return (
        <View style={[styles.container, props.style]}>
            <View>
                <View style={styles.firstItems}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontWeight: 'bold', }}>{props.symbol}</Text>
                        <Text> | </Text>
                        <Text>{props.name}</Text>
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', }}>{price} $</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>24h: </Text>
                        <Text style={percent24h > 0 ? styles.percentPlus : styles.percentMinus}>{percent24h} %</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>7d: </Text>
                        <Text style={percent7d > 0 ? styles.percentPlus : styles.percentMinus}>{percent7d} %</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderColor: '#555',
        borderRadius: 6,
        marginVertical: 5
    },
    firstItems: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        padding: 5
    },
    percentMinus: {
        color: 'red',
        fontWeight: 'bold'
    },
    percentPlus: {
        color: 'green',
        fontWeight: 'bold'
    }

})
