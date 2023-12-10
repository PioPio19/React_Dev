import { View,Text, StyleSheet, SafeAreaView, Pressable} from "react-native";
import React, {useState} from "react";
import { Stack, Link, router } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import { GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const onboardingSteps =[
    {
    icon:'piggy-bank',
    title:'On Boarding 1',
    descriptions:
    'Aku Ra iso nompo lahmudolanan tresno, tak akoni pancen aku iki dudu sopo sopo.',
    },
    {
    icon:'apple',
    title:'On Boarding 2',
    descriptions:
    'Aku Ra iso nompo lahmudolanan tresno, tak akoni pancen aku iki dudu sopo sopo.',
    },
    {
    icon:'archive',
    title:'On Boarding 3',
    descriptions:
    'Aku Ra iso nompo lahmudolanan tresno, tak akoni pancen aku iki dudu sopo sopo.',
    },
]

export default function OnboardingScreen(){
    const [screenIndex, setScreenIndex] = useState(0);

    const data = onboardingSteps[screenIndex];

    const onContinue = () => {
        // console.warn('continue');
        const isLastScreen = screenIndex === onboardingSteps.length -1;
        if (isLastScreen){
            // setScreenIndex(0);
            endOnBoarding();
        }
        else{
            setScreenIndex(screenIndex + 1);            
        }
    };

    const onBack = () => {
        const isFirstScreen = screenIndex === 0;
        if(isFirstScreen){
            endOnBoarding();
        } else {
            setScreenIndex(screenIndex - 1);
        }
    };

    const endOnBoarding =()=>{
        setScreenIndex(0);
        router.back();
    };

    const swipes = Gesture.Simultaneous(
        Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
        Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
    );
    return (
        <SafeAreaView style={styles.page}>
            <Stack.Screen options={{ headerShown: false}} /> 

            <StatusBar style="light" />
            <GestureDetector gesture={swipes}>

                <View style={styles.pageContent} key={screenIndex}>

                    <View style={styles.stepIndicatorContainer}>
                        {onboardingSteps.map((step, index)=>(
                            <View 
                                key={index}
                                style={[
                                    styles.stepIndicator,
                                    { backgroundColor: index === screenIndex ? '#CEF090' : 'grey' },
                                ]}
                            />
                        ))}
                    </View>

                    <Animated.View entering={FadeIn.delay(50)} exiting={FadeOut}>
                    <FontAwesome5
                    style={styles.image}
                    name={data.icon}
                    size={150}
                    color="#CEF202"
                    />
                    </Animated.View>

                    {/* footer */}
                    <View style={styles.footer}>
                        <Animated.Text 
                            entering={SlideInRight.delay(100)}
                            exiting={SlideOutLeft.delay(100)} 
                            style={styles.title}>
                            {data.title}
                        </Animated.Text>

                        <Animated.Text 
                            entering={SlideInRight.delay(200)}
                            exiting={SlideOutLeft.delay(100)}  
                            style={styles.description}>
                            {data.descriptions}
                        </Animated.Text>

                        <View style={styles.buttonRow}>
                            <Text onPress={endOnBoarding} style={styles.buttonText}>
                                Skip</Text>

                            <Pressable onPress={onContinue} style={styles.button}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </GestureDetector> 
        </SafeAreaView>
    );
}

const styles =  StyleSheet.create({
    page: {
        // alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#15141A',
    },

    pageContent:{
        padding: 20,
        flex: 1,
        // backgroundColor: 'red'
    },

    image: {
        alignSelf: 'center',
        margin: 20,  
        marginTop: 70,
    },

    title: {
        color: '#FDFDEF',
        fontSize: 30,
        fontFamily: 'InterSemi',
        letterSpacing: 1.9,
        marginVertical: 20,
    },

    description: {
        color: '#FDFAAA',
        fontSize: 20,
        fontFamily: 'Amatic',
        lineHeight: 25,
    },

    footer: {
        marginTop: 'auto',
    },

    buttonRow:{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    button:{
        backgroundColor: '#302E38',
        borderRadius: 50,
        alignItems: 'center',
        flex: 1,
    },

    buttonText:{
        color: '#DFFFDF',
        fontFamily: 'InterSemi',
        fontSize: 18,

        padding: 15,
        paddingHorizontal: 25,
    },

    //steps
    stepIndicatorContainer:{
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        marginHorizontal: 50,
        // backgroundColor: 'red'
    },

    stepIndicator:{
        flex: 1,
        height: 3,
        backgroundColor: 'grey',
        // margin: 5, 
        borderRadius: 10,
    },
})