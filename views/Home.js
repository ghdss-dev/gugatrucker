import React from 'react'; 
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { styles } from '../assets/css/Css';

export default function Home(props) {
    return (
        <View style={styles.container2}>

            <TouchableOpacity style={styles.button__home} onPress={() => props.navigation.navigate('Login')}>
                <Image source = {require('../assets/img/buttonLogin.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Rastreio')}>
                <Image source = {require('../assets/img/buttonRastreio.png')}/>
            </TouchableOpacity>
            

        </View>
    );
}

