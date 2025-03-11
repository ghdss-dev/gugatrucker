import React from "react";
import { View, Text, TouchableOpacity } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MenuAreaRestrita(props) {

    async function logout() {

        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    }

    return (

        <View style={styles.area__menu}>

            <TouchableOpacity style={styles.button__home2} onPress={()=>props.navigation.navigate('Home')}>

                <Icon name="home" size={20} color="#999" />

            </TouchableOpacity>

            <Text style={styles.area__title}>{props.title}</Text>

            <TouchableOpacity style={styles.button__logout} onPress={()=>logout()}>

                <Icon name="sign-out" size={20} color="#999" />

            </TouchableOpacity>

        </View>
    );
}