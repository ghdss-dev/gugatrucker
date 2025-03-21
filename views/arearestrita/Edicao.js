import React, { useEffect, useState } from 'react'; 
import { Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from '../../assets/components/MenuAreaRestrita';
import { Camera } from 'expo-camera';
import 'react-native-url-polyfill/auto';


export default function Edicao(navigation) {

    const [hasPermission, setHasPermission] = useState('');
    const [scanned, setScanned] = useState(); 
    const [displayQR, setDisplayQR] = useState('flex');
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [product, setProduct] = useState(null);
    const [localization, setLocalization] = useState(null);

    useEffect(() => {

        (async () => {

            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');

        })();

    }, []);

    // Leitura do QR
    async function handleBarCodeScanned({type, data}) {

        setScanned(true); 
        setDisplayQR('none');
        setDisplayForm('flex');
        setCode(data);
        
    }

    async function sendForm() {


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

              <Text>Código do Produto: {code}</Text>

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

            </View>
        </View>
    );
}