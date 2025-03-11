import React, { useEffect, useState } from 'react'; 
import {KeyboardAvoidingView, TextInput, Image, Text, View, TouchableOpacity, Platform} from 'react-native';
import { styles } from '../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import config from '../config/config.json';

export default function Login({navigation}) {

    const [display, setDisplay] = useState('none');
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null); 
    const [login, setLogin] = useState(false);

    useEffect(()=> {

        verifyLogin();

    }, []); 

    useEffect(() =>{

        if(login === true) {

            biometric();
        }

    }, [login]);

    // Verifica se o usuário já possui algum login 
    async function verifyLogin() {

        let response = await AsyncStorage.getItem('userData'); 
        let json = await JSON.parse(response);
        console.log(response);

        if(json !== null) {

            setUser(json.name);
            setPassword(json.password);
            setLogin(true);

            biometric();
        }
    }

     // Função de Biometria
     async function biometric() {

        console.log('Chamei a biometria');
    
        const compatible = await LocalAuthentication.hasHardwareAsync(); // Verifica se há hardware compatível

        if (compatible) {

            let biometricRecords = await LocalAuthentication.isEnrolledAsync();

            if(!biometricRecords) {

                alert('Biometria não cadastrada'); 

            } else {

                let result = await LocalAuthentication.authenticateAsync();

                if(result.success) {

                    sendForm();

                } else {

                    setUser(null); 
                    setPassword(null);
                }
            }
            
        }

    }

    async function sendForm() {

        let response = await fetch(`${config.urlRoot}login`, {

            method: 'POST',
            headers: {

                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                name: user,
                password: password
            })

        });

        let json = await response.json();

        console.log(json);
        
        if(json === 'error') {

            setDisplay('flex');

            setTimeout(() => {

                setDisplay('none');

            }, 5000);

            await AsyncStorage.clear()

        } else {

            await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('AreaRestrita');
        }
    }

    return (
      
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height" } style={[styles.container, styles.darkbg]}>

            <View style={styles.css}>

                <Image source={require('../assets/img/logomarca.jpg')} />
                
            </View>

            {/* Corrigindo a referência ao estilo da mensagem de erro */}
            <View>
                <Text style={styles.login__msg(display)}>Usuário ou senha inválidos!</Text>
            </View>


            <View style = {styles.login__form}>

                < TextInput style={styles.login__input} placeholder='Usuário: ' onChangeText={text=>setUser(text)}/> 

                < TextInput style={styles.login__input} placeholder='Senha: ' onChangeText={text=>setPassword(text)} secureTextEntry= {true}/> 

                <TouchableOpacity style={styles.login__button} onPress={() => sendForm()}>
                    <Text style = {styles.login__buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
        
    );
}