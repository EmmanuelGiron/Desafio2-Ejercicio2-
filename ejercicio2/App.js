import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';
import Formulario from './components/Formulario';

function App() {
  //Hooks
  const [modalVisible,setModalVisible] = useState(false)

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.cotenedor}>
         <Formulario
         modalVisible={modalVisible}
         setModalVisible={setModalVisible}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cotenedor: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
