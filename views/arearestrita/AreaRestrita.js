import React, { useEffect, useState } from 'react'; 
import { Text, View } from 'react-native';
import { styles } from '../../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Profile, Cadastro, Edicao } from '../index';
import { MaterialIcons } from '@expo/vector-icons'; // Biblioteca de ícones

export default function AreaRestrita() {
    const Tab = createMaterialBottomTabNavigator();
    const [user, setUser] = useState(null); 

    useEffect(()=> {
        async function getUser() {
            let response = await AsyncStorage.getItem('userData'); 
            let json = JSON.parse(response); 
            setUser(json?.name);
        }
        getUser();
    }, []);

    return (

        <Tab.Navigator
            activeColor='#999' 
            inactiveColor='#fff'
            barStyle={styles.area__tab} 
        >
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="person" size={20} color="#999" />
                    ),
                }}
            />

            <Tab.Screen 
                name="Cadastro" 
                component={Cadastro} 
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="archive" size={20} color="#999" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Edição"
                component={Edicao} 
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="edit" size={20} color="#999" />
                    ),
                }}
            />

            
        </Tab.Navigator>

    );
}
