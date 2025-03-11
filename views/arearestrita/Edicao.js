import React, { useEffect, useState } from 'react'; 
import { Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from '../../assets/components/MenuAreaRestrita';


export default function Edicao(navigation) {

    return (

        <View>
            <MenuAreaRestrita title='Edição' navigation={navigation}/>
        </View>
    );
}