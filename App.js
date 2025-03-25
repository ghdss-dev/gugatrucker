import React, { useEffect, useState } from 'react'; 
import 'react-native-url-polyfill/auto';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home, Login, Rastreio, } from './views';
import AreaRestrita from './views/arearestrita/AreaRestrita';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo-notifications';

export default function App()  {

    const Stack = createStackNavigator();

    const [expoPushToken, setExpoPushToken] = useState(null);

    /*async function teste() {

      let resData = await AsyncStorage.getItem('userData');

      console.log(JSON.parse(resData));
    }*/

    useEffect(()=>{

      registerForPushNotificationsAsync();

    }, [])

    useEffect(() => {

      if(expoPushToken != null) {

        sendToken();
      }
    }, [expoPushToken])
    // Registra o token do usuário
    async function registerForPushNotificationsAsync () {

      if (Constants.isDevice) {

          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          
          if (existingStatus !== 'granted') {

              const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
              finalStatus = status;
          }
          
          if (finalStatus !== 'granted') {

              alert('Failed to get push token for push notification!');
              return;
          }
          
          const token = await Notifications.getExpoPushTokenAsync();
          console.log(token);
          setExpoPushToken(token);

      } else {

          alert('Must use physical device for Push Notifications');
      }
  
      if (Platform.OS === 'android') {

          Notifications.createChannelAndroidAsync('default', {

              name: 'default',
              sound: true,
              priority: 'max',
              vibrate: [0, 250, 250, 250],

          });
      }
  };

  // Envio do token 
  async function sendToken() {

    let response = await fetch(config.urlRoot+'token', {

      method:'POST', 
      headers: {

        Accept: 'application/json', 
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        token: expoPushToken
      })
    });
  }
  

    return (
       <NavigationContainer>

          <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{
              title: "Guga Tracker",
              headerStyle: { backgroundColor: "#F58634" },
              headerTintColor: "#333",
              headerTitleStyle: { fontWeight: "bold" },
              headerTitleAlign: "center", // Centraliza o título corretamente
            }}
          />

            <Stack.Screen name="Login" 

              component = {Login} 
              options={{headerShown:false}}
            />
            
            <Stack.Screen name="Rastreio"
              component = {Rastreio} 
            />

            {<Stack.Screen name="AreaRestrita" options={{headerShown:false}} component = {AreaRestrita} />}

          </Stack.Navigator>

      </NavigationContainer>
    );
}
