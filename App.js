import React, { useEffect, useState } from 'react'; 

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home, Login, Rastreio, } from './views';
import AreaRestrita from './views/arearestrita/AreaRestrita';

export default function App()  {

    const Stack = createStackNavigator();

    /*async function teste() {

      let resData = await AsyncStorage.getItem('userData');

      console.log(JSON.parse(resData));
    }*/

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

            {<Stack.Screen name="AreaRestrita" component = {AreaRestrita} />}

          </Stack.Navigator>

      </NavigationContainer>
    );
}
