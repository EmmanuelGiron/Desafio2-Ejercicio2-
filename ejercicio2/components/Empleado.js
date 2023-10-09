import React from 'react'
import {View, Text,StyleSheet} from 'react-native'

function Empleado({item}) {
  const {nombres,apellidos, salario,año,categoria, salarioProximoAño} = item
  return (
   <View style={styles.contenedor}>
    <View style={styles.contenedorTextoFila}>
      <Text style={styles.bold}>Nombre:</Text><Text> {nombres +' '+apellidos}</Text>
    </View>
    <View style={styles.contenedorTexto}>
      <View style={styles.contenedorTextoFila}>
        <Text style={styles.bold}>Salario: </Text><Text>${salario}</Text>
      </View>
      <View style={styles.contenedorTextoFila}>
        <Text style={styles.bold}>Salario total: </Text><Text>${salarioProximoAño}</Text>
      </View>
    </View>
    <View style={styles.contenedorTexto}>
      <View style={styles.contenedorTextoFila}>
        <Text style={styles.bold}>{categoria}</Text>
      </View>
      <View style={styles.contenedorTextoFila}>
        <Text style={styles.bold}>Años trabajados:</Text><Text> {año}</Text>
      </View>
    </View>
   </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#E3F7CA',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1,
    marginVertical: 5,
    justifyContent: 'space-between'
  },contenedorTexto: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },bold: {
    fontWeight: 'bold',
  },contenedorTextoFila:{
    flexDirection: 'row',
  }
})
export default Empleado