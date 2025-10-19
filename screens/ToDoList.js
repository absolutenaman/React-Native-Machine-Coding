import React, {useCallback, useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Button, FlatList, Text, TextInput, View, StyleSheet} from "react-native";
import Todo from "../components/Todo";

const ToDoList = () => {
    const [listsData, setListsData] = useState([])
    const [newInputTodoVIsible, setNewInputTodoVisible] = useState(false)
    const [newInputContent, setNewInputContent] = useState("");
    const inputRef = useRef();

    useEffect(async () => {
        try {
            const value = await AsyncStorage.getItem('todoList');
            if(value?.length >0){
                setListsData(value)
            }
        } catch (e) {
            console.log("Error in setting the data in async storage memory")
        }
    }, [])
    const updateMemory = (async () => {
        try {
            await AsyncStorage.setItem('todoList', JSON.stringify(listsData));
        } catch (e) {
            console.log("Error in setting the data in async storage memory")
        } finally {
            console.log("async storage updated successfully")
        }
    })

    useEffect(() => {
        if (newInputTodoVIsible) {
            inputRef.current.focus()
        }
    }, [newInputTodoVIsible]);

    const deleteElement = async (id) => {
        setListsData(listsData.filter((item) => {
            return item.id !== id
        }));
        await updateMemory().then(r => console.log("updated data", r))
    }
    const upDateList = (data, currInput) => {
        let tempData = listsData.filter((item) => item.id !== data.id)
        tempData.push({value: currInput, id: data.id})
        setListsData(tempData)
        updateMemory().then(r => console.log("updated data",r))
    }
    return (
        <View style={styles.container}>
            <Button title={"Add"} onPress={() => {
                setNewInputTodoVisible(true);
            }}/>
            {
                newInputTodoVIsible &&
                <TextInput style={styles.input} ref={inputRef} onChangeText={(data) => {
                    setNewInputContent(data)
                }} onBlur={() => {
                    setListsData((prev) => [...prev,{value:newInputContent,id:Date.now().toString()}])
                    setNewInputTodoVisible(false);
                    updateMemory().then(r => console.log("updated data",r))
                }}/>
            }
            <FlatList data={listsData} renderItem={({item}) => {
                return <Todo data={item} deleteElement={deleteElement} upDateList={upDateList}/>
            }}>
            </FlatList>
        </View>
    )
};

export default ToDoList;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        padding: 10
    },

    input: {
        backgroundColor: "maroon",
        padding: '10',
        border: "1px solid black",
        width: "80%",

    }
})