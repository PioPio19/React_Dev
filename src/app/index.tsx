import { StatusBar } from 'expo-status-bar';
import { 
  ActivityIndicator,
  FlatList, 
  StyleSheet, 
  Text, 
  View } from 'react-native';
import DayListItem from '@components/core/DayListItem';
import { GestureHandlerRootViewProps } from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerRootView';

const days =[...Array(24)].map((val,index)=> index+1);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={days}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.column}
        numColumns={2}
        renderItem={({item})=> <DayListItem day={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  
  column: {
    gap: 10
  },

  content: {
    gap: 10,
    padding: 10,
  },
});