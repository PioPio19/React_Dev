import { Stack } from "expo-router";
import { useEffect } from 'react';import { useFonts, Inter_900Black, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {AmaticSC_400Regular,AmaticSC_700Bold} from '@expo-google-fonts/amatic-sc'

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default function RootLayout(){

    const [fontsLoaded, fontError]= useFonts({
        Inter: Inter_900Black,
        InterSemi: Inter_600SemiBold,
        Amatic: AmaticSC_400Regular,
        AmaticBold: AmaticSC_700Bold,
      });
      
      useEffect(() => {
        if (fontsLoaded || fontError) {
          SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
        console.log("not loaded");
      }
    
    return( 
        
        <Stack screenOptions={{}}>
            <Stack.Screen name='index' options={{title: 'Devember'}} />
            </Stack>
    );
}