import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions } from 'react-native';

const { width,height } = Dimensions.get("screen");

class Loading extends Component {
    render() {
        return (
            <View style={styles.Container}>
                <Text style={styles.body}>하루세끼</Text>  
            </View>
        )
    }
}

export default Loading;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5d742',
        width: width,
    },
    body: {
        fontSize: 40,
        fontWeight: 'bold',
    },
})
