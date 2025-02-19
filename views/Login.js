import React, { useEffect, useState } from 'react'; 
import {KeyboardAvoidingView, TextInput, Image, Text, View, TouchableOpacity, Platform} from 'react-native';
import { styles } from '../assets/css/Css';

export default function Login() {

    const [display, setDisplay] = useState('none');
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null); 
    const [login, setLogin] = useState(null);

    async function sendForm() {

        let response = await fetch('http://192.168.100.3:3000/login', {

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
        
        if(json === 'error') {

            setDisplay('flex');
            setTimeout(() => {

                setDisplay('none');

            }, 5000);
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