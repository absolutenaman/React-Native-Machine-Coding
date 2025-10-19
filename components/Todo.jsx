import React, {useRef, useState} from "react";
import {Button, TextInput, View,StyleSheet} from "react-native";

const Todo = ({data,deleteElement,upDateList}) => {
    const inputRef = useRef();
    const [currInput,setCurrInput]=useState(data.value);

    return <View style={styles.row}>
        <TextInput ref={inputRef} onChangeText={(text)=>{setCurrInput(text)}} onBlur={()=>{
            upDateList(data,currInput);
        }}>{currInput}</TextInput>
        <Button onPress={()=>{inputRef.current.focus()}} title={"Edit"}/>
        <Button onPress={()=>deleteElement(data.id)} title={"Remove"}/>
    </View>
}

export default Todo;

export const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        width: "100%",
        margin: 20,
        backgroundColor: "purple",
        justifyContent: "space-evenly"
    },
});