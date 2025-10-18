import React, { useEffect, useMemo, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const ChattingAppWebsockets = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const socket = useMemo(() => {
        return new WebSocket("ws://10.0.2.2:8080/?name=Naman");
    }, []);

    useEffect(() => {
        socket.onopen = () => {
            console.log("✅ Connected to WebSocket");
            console.log("ReadyState:", socket.readyState);
        };
        socket.onmessage = (event) => {
            console.log("📩", event.data);
            setMessages((prev) => [...prev, event.data]);
        };
        socket.onerror = (err) => {
            console.log("❌ WebSocket Error:", err);
        };
        socket.onclose = () => console.log("❌ Disconnected from server");

        return () => {
            socket.close();
        };
    }, [socket]);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            console.log("Sending:", input);
            const myMsg = `You: ${input}`;
            setMessages((prev) => [...prev, myMsg]);
            socket.send(input);
            setInput("");
        } else {
            console.log("Socket not open, readyState:", socket?.readyState);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Chat Room</Text>
            {messages.map((item, index) => (
                <Text key={index}>{item}</Text>
            ))}
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Type a message..."
                style={{
                    padding: 12,
                    borderRadius: 5,
                    borderColor: "black",
                    borderWidth: 1,
                    marginTop: 10,
                }}
            />
            <Button title="SEND" onPress={sendMessage} />
        </View>
    );
};

export default ChattingAppWebsockets;