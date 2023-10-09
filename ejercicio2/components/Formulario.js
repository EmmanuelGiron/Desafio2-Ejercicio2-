import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react'
import {Text, StyleSheet,View,TextInput, Pressable,Modal, Alert,FlatList,ScrollView,Image} from 'react-native'
import Empleado from './Empleado';


function Formulario({modalVisible,setModalVisible}) {
    //Hook para almacenar los empleados
    const [empleados,setEmpleados]= useState([])
    //Hooks con informacion del empleado
    const [nombres,setNombres] = useState('')
    const [apellidos,setApellidos] = useState('')
    const [salario,setSalario] = useState('')
    const [año,setAño] = useState('')
    const [categoria, setCategoria] = useState('Seleccionar')
    //Hooks para nuevo salario
    const [salarioProximoAño,setSalarioProximoAño] = useState(0)
    const [incremento,setIncremento] = useState(0)
    const [incrementoPorAños,setIncrementoPorAños] = useState(0)
    //Constantes
    const [porcentajeCategoria,setPorcentajeCategoria] = useState(0)


    const handleOpcion = (value) => {
        setCategoria(value)
      if(value === 'Categoría 1'){
        setPorcentajeCategoria(0.15)
      }else if(value === 'Categoría 2'){
        setPorcentajeCategoria(0.10)
      }else if(value === 'Categoría 3'){
        setPorcentajeCategoria(0.05)
      }
    }

    
    const handleAño = (value) => {
      setIncrementoPorAños(value * 3)
    }



  useEffect(() => {
      console.log('Porcentaje categoria: ',porcentajeCategoria) 
      console.log('salario: ',salario)
      console.log('año: ',año)
      console.log('Incremento por años: ',incrementoPorAños) 
      //Calculo del nuevo salario
      const Salario = parseFloat(salario)
      const IncrementoPorAños = parseFloat(incrementoPorAños)
      const formula = (porcentajeCategoria*Salario) + (IncrementoPorAños*Salario)
      setIncremento(formula)
      setSalarioProximoAño(parseFloat(salario)+parseFloat(incremento))
      console.log('Salario proximo año: ',salarioProximoAño)
  }, [salario,categoria,año,salarioProximoAño,incremento]);

  
    
    const handleCalcular = () =>{
      //Arreglo de errores
      const validaciones = []
      //Expresiones regulares
      const esDecimal = /^-?\d*\.?\d+$/
      const esEntero = /^-?\d+$/ 
      const esTexto = /^[a-zA-Z]+$/
      //Comprobar si ya existe el nombre 
      const nombreExiste= empleados.some((empleado) => empleado.nombres === nombres)
      const apellidoExiste= empleados.some((empleado) => empleado.apellidos === apellidos)

      if([nombres,apellidos,salario,año,categoria].includes('')){
        Alert.alert('Error','Todos los campos son obligatorios', [{text: 'Ok'}])
        return 
      }
      if(!esTexto.test(nombres.trim())){
        validaciones.push('El campo de nombre/s debe ser texto')
      }
      if(!esTexto.test(apellidos.trim())){
        validaciones.push('El campo de apellido/s debe ser texto')
      }
      if(salario <300 || salario>10000){
        validaciones.push('El salario debe ser entre $300 a $10000')
      }if(año <=0 || año>29){
        validaciones.push('Los años trabajados deben de ser entre 1 a 29')
      } if(!esDecimal.test(salario)){
        validaciones.push('El salario debe ser un número decimal')
      }if(!esEntero.test(año)){
        validaciones.push('El año debe ser un número entero')
      }
      if(categoria === 'Seleccionar'){
        validaciones.push('Debe seleccionar una categoria')
      }if(nombreExiste && apellidoExiste){
        validaciones.push('El nombre ya esta en uso')
      }if (validaciones.length > 0) {
        Alert.alert('Campos incorrectos', validaciones.join('\n'), [{ text: 'Ok' }])
        return
      }
      
    
     
     //Guardando el empleado en empleados 
     const nuevoEmpleado = {
      id : Date.now(),
      nombres,
      apellidos,
      salario,
      año,
      categoria,
      salarioProximoAño
    }
    
    //Guardando al empleado en el arreglo de objetos
    setEmpleados([...empleados,nuevoEmpleado])
    setModalVisible(!modalVisible)
    //Limpiando formulario
    setNombres('')
    setApellidos('')
    setSalario('')
    setAño('')
    setCategoria('Seleccionar')
    };
    const handleModal = () =>{
      setModalVisible(!modalVisible)
    };
  return (<>
    <Text  style={styles.titulo}>Calculo de nuevo salario {''}</Text>
    <View style={styles.campo}> 
        <Text style={styles.label}>Nombres</Text>
        <TextInput style={styles.input} placeholder='Nombres Empleado'
        value={nombres}
        onChangeText={setNombres}
        />
    </View>
    <View style={styles.campo}>
        <Text style={styles.label}>Apellidos</Text>
        <TextInput style={styles.input} placeholder='Apellidos Empleado'
        value={apellidos}
        onChangeText={setApellidos}
        />
     </View>
     <View style={styles.campo}>
        <Text style={styles.label}>Salario</Text>
        <TextInput style={styles.input} placeholder='Salario Empleado'
        value={salario}
        onChangeText={setSalario}
        keyboardType='number-pad'
        />
     </View>
     <View style={styles.campo}>
        <Text style={styles.label}>Años</Text>
        <TextInput style={styles.input} placeholder='Años trabajados'
        value={año}
        onChangeText={(value)=>{setAño(value), handleAño(value)}}
        keyboardType='number-pad'
        />
     </View>
     <View>
      <Text style={styles.label}>Seleccione su categoría</Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(value) => {handleOpcion(value)}}
        style={styles.input}
      >
        <Picker.Item label='Seleccionar' value="Seleccionar" />
        <Picker.Item label='Categoría 1' value="Categoría 1" />
        <Picker.Item label='Categoría 2'value="Categoría 2" />
        <Picker.Item label='Categoría 3' value="Categoría 3" />
      </Picker>
    </View>
    <Pressable style={styles.btnCalcular}
        onPress={handleCalcular} >
    <Text style={styles.btnInfoTexto}>Calcular</Text>
    </Pressable>

    {/**Resultado de todos los empleados*/}
    <Modal animationType='slide' visible={modalVisible}>
    <View style={styles.contenedor}>
    <Pressable style={styles.btnAtras} onPress={handleModal}><Text style={styles.btnText}></Text>
    <Image source={require('../img/arrow-left.png')} style={styles.imagen}/></Pressable>
    <Text style={styles.listaEmpleados}>Lista de empleados</Text>  
    {empleados.length === 0 ? <Text style={styles.sinEmpleados}>No hay Empleados</Text>: 
      <FlatList
      style={styles.listadoEmpleados}
      data={empleados}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => {
        //console.log(item)
        return(
         <Empleado
         item={item}/>
        )
      }}
   />
    }
    </View>
    </Modal>
     </>
  )
}

const styles = StyleSheet.create({
    label: {
        color:'black', 
        marginHorizontal:3,
        marginBottom:10,
        marginTop: 15,
        fontSize:20,
        fontWeight:'600'},
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginHorizontal: 1,
        padding: 15,
        marginBottom: 10},
    btnCalcular:{
      backgroundColor: 'green',
      padding:15,
      marginTop:20,
      borderRadius: 10
    },btnAtras:{
      backgroundColor: 'transparent',
      padding:2,
      marginTop:20,
      borderRadius: 10,
      marginRight: 290
    },
    btnInfoTexto: {
      textAlign: 'center',
      color:'#FFF',
      fontSize:18,
      fontWeight: '900',
      textTransform: 'uppercase'

    },
    titulo:{
      textAlign: 'center',
      color: 'blue',
      fontSize: 20,
      marginBottom: 20,
      textTransform: 'uppercase',
      fontWeight: '600'
    }, contenedor: {
        marginTop: 32,
        paddingHorizontal: 24,
    },listadoEmpleados:{
      marginTop:50,
      marginHorizontal: 30,
    }, listaEmpleados: {
      marginTop: 20,
      textAlign: 'center',
      fontWeight:'900',
      textTransform: 'uppercase',
      color: 'blue',
      fontSize: 20,
    },btnText: {
      padding: 0
    }, imagen: {
      width: 35,
      height: 35,
    }

})

export default Formulario