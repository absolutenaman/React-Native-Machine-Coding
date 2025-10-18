import React, {use, useState} from "react";
import asyncStorage from "@react-native-async-storage/async-storage"
import {Button, FlatList, Text, TextInput, View} from "react-native";
const ToDoList = () => {
    const [listsData,setListsData]=useState(asyncStorage.getItem("todoList"))
    const [newInputTodoVIsible,setNewInputTadoVisible]=useState(false)
    const [newInputContent,setNewInputContent]=useState("");

    return (
        <View style={styles.container}>
            <Button title={"Add"}/>
            {
                newInputTodoVIsible &&
                <TextInput  onChangeText={(data)=>{
                    setNewInputContent(data)
                }}/>
            }
            <FlatList  data={listsData} renderItem={(item)=>{
                return <View style={styles.row} key={item.value}>
                    <Text>{item.value}</Text>
                    <Button title={"Edit"}/>
                    <Button title={"Remove"}/>
                </View>
            }}>
            </FlatList>
        </View>
    )
};

export default ToDoList;

const styles=StyleSheet.create({
    container:{
        display:"flex",
        flex:1
    },
    row:{
        display:"flex",
        flexDirection:"row",
        padding:10,
        backgroundColor:"purple"
    }
})