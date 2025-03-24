import React, { useEffect, useState } from 'react'; 
import { Text, View, Button, Image, Touchable, TouchableOpacity} from 'react-native';
import { styles } from '../../assets/css/Css';
import config from '../config/config';

export default function Rastreio({navigation}) {

    const [code, setCode] = useState(null);
    const [response, setResponse] = useState(null);

    // Envia os dados do formulário 
    async function sendForm() {

        let response = await fetch(config.urlRoot+'rastreio', {

            method: 'POST',
            headers: {

                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                code: code
            })
        });

        let json = await response.json();
        setResponse(json);
    }

    return (

        <View style={styles.css}>

            <Image source={require('../assets/img/logomarca.jpg')} />

            <TextInput style={[styles.login__input, styles.rastreio__inputMargin]} placeholder='Digite o código de rastreio: ' onChangeText={text=>setCode(text)}/> 

            <TouchableOpacity style={styles.login__buttonText} onPress={()=>sendForm()}> 
                <Text style= {styles.login__buttonText}>Rastrear</Text>
            </TouchableOpacity>

            <Text>{response}</Text>
        
        </View>
    );
}