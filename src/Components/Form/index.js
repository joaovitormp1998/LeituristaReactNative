import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, } from "react-native";
import {Picker} from "@react-native-picker/picker";
import TakePicture from '../Camera';
import { estilos } from '../Style/index';


export default function Form() {

    const [matricula, setMatricula] = useState(null);
    const [codigo, setCodigo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

  
    function validar() {
        if(matricula != null && selectedValue != "default" && codigo != null) {
            setIsOpen(true)
        } else {
            Alert.alert('Todos os campos devem ser preenchidos!')
        }
    }
    function confirmarEnvio() {
        setIsOpen(false)
        setMatricula(null)
        setCodigo(null)
        setSelectedValue("default")
    }


    return (
        <View>
            <View style={estilos.form}>
                <Text style={estilos.label} >Informe a Matricula</Text>
                <TextInput 
                style={estilos.input}
                keyboardType="numeric" 
                onChangeText={setMatricula} 
                value={matricula} 
                />
                <Text style={estilos.label}>Informe o Código</Text>
                <TextInput 
                onChangeText={setCodigo} 
                value={codigo}
                style={estilos.input} />
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >   
                    <Picker.Item label="Por favor Selecione uma opcao:" value="default" />
                    <Picker.Item label="Leitura Implausíve" value="leituraImplausivel" />
                    <Picker.Item label="Releitura" value="releitura" />
                    <Picker.Item label="Situaçao de Risco" value="situacaoRisco" />
                    <Picker.Item label="Suspeita de fraude" value="suspeitaFraude" />
                    <Picker.Item label="Impedimento de leitura" value="impedimentoLeitura" />
                </Picker>
                <TouchableOpacity style={estilos.botao} 
                onPress={() => validar()} >
                <Text style={estilos.botaoTexto}>
                    Tirar Foto
                </Text>
                </TouchableOpacity>
                
            </View>
            <Modal transparent={true} visible={isOpen}>
                <TakePicture 
                    matricula={matricula}
                    codigo={codigo}
                    situacao={selectedValue}
                    confirmarEnvio={confirmarEnvio}
                    
                />
                  
            </Modal> 

        </View>
    );
}

