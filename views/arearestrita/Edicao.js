import React, { useEffect, useState } from 'react'; 
import { Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from '../../assets/components/MenuAreaRestrita';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import 'react-native-url-polyfill/auto';
import config from '../../config/config';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { json } from 'sequelize';

export default function Edicao(navigation) {

    const [hasPermission, setHasPermission] = useState('');
    const [scanned, setScanned] = useState(); 
    const [displayQR, setDisplayQR] = useState('flex');
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [product, setProduct] = useState(null);
    const [localization, setLocalization] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {

        (async () => {

            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');

        })();

    }, []);

    useEffect(() => {

        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync(); 

            if (status !== 'granted') {

                setErrorMsg('Permission to access location was denied'); 
            }
        })
    })

    // Leitura do QR
    async function handleBarCodeScanned({type, data}) {

        setScanned(true); 
        setDisplayQR('none');
        setDisplayForm('flex');
        setCode(data);
        await getLocation();
        await searchProduct(data)
    }

    async function searchProduct(codigo) {

        let response = await fetch(config.urlRoot+'searchProduct', {

            method: 'POST',

                headers: {
    
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
    
            body: JSON.stringify({

                code: codigo, 
            })
        });

        let json = await response.json(); 
        setProduct(json.Products[0].name);
    }


    async function sendForm() {
        
        let response = await fetch(config.urlRoot+'update', {

            method: 'POST',
            headers:{

                Accept: 'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({

                code: code, 
                product: product, 
                local: localization
            })
        });

        let json = await response.json();
        setResponse(json);
    }

    // Nova Leitura do QRCode
    async function readAgain() {

        setScanned(false);
        setDisplayQR('flex'); 
        setDisplayForm('none'); 
        setCode(null);
        setProduct(null); 
        setLocalization(null);
    }

    // Retorna a posição e endereço do usuário 
    async function getLocation() {

        let location = await Location.getCurrentPositionAsync({});
        Geocoder.init(config.geocodingAPI);
        Geocoder.from(location.coords.latitude, location.coords.longitude)
            .then(json => {

                let number = json.results[0].address_components[0].short_name;
                let street = json.results[0].address_components[1].short_name;
                setLocalization(`${street} - ${number}`);

            })
            .catch(error => console.warn(error));
    }

    if (hasPermission === null) {

        return <Text>Solicitando permissão para acessar a câmera...</Text>;
    }

    if (hasPermission === false) {

        return <Text>Sem acesso à câmera.</Text>;
    }

    return (

        <View style={{ flex: 1 }}>
            <MenuAreaRestrita title='Edição' navigation={navigation}/>

            <BarCodeScanner 

                onBarCodeScanned={scanned ? undefined : value=>handleBarCodeScanned(value)} 
                style={styles.qr__code(displayQR)}
            />

            <View style={styles.qr__form(displayForm)}>

              <Text>{response}</Text>

              <View style={styles.login__input}>
                  
                  <TextInput 
                      placeholder='Nome do Produto:'
                      onChangeText={text=>setProduct(text)}
                      value={product}
                  />
              </View>

              <View style={styles.login__input}>
                  
                  <TextInput 
                      placeholder='Localização do Produto:'
                      onChangeText={text=>setLocalization(text)}
                      value={localization}
                  />
              </View>

              <TouchableOpacity style={styles.login__button} onPress={()=> sendForm()}>
                <Text> Atualizar </Text>
              </TouchableOpacity>

              {
                scanned &&
                    <View>

                        <Button 

                            title='Escanear Novamente' 
                            onPress={() => readAgain()}
                        />
                    </View> 
              }

            </View>
        </View>
    );
}