import { StyleSheet, Text, View, Image, Alert, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"
import axios from "axios";

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password
        }
        //send a post req to the backend API
        axios
        .post("http://localhost:8000/register", user)
        .then((resp) => {
            console.log(resp);
            Alert.alert("Registeration successful");
            setName("");
            setEmail("")
            setPassword("")
        }).catch((err) => {
            Alert.alert("Registeration Failed", "Please try again in 804 seconds");
            console.log("Registeration failed:", err);

        })

    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <View>
                <Image source={require('../assets/amazon.png')}
                    style={{ marginTop: 40, height: 100, width: 200 }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: "#041E42", marginTop: 12 }}>Register to your Account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            borderRadius: 5,
                            paddingVertical: 5,
                            marginTop: 30,
                            backgroundColor: "#D0D0D0"
                        }}>
                        <FontAwesome style={{ marginLeft: 8 }} name="user" size={24} color="gray" />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder='Enter your name'
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            borderRadius: 5,
                            paddingVertical: 5,
                            marginTop: 30,
                            backgroundColor: "#D0D0D0"
                        }}>
                        <Ionicons style={{ marginLeft: 8 }} name="mail" size={24} color="gray" />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                            placeholder='Enter your email'
                        />
                    </View>
                </View>
                <View style={{}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            borderRadius: 5,
                            paddingVertical: 5,
                            marginTop: 30,
                            backgroundColor: "#D0D0D0"
                        }}>
                        <Feather style={{ marginLeft: 8 }} name="lock" size={24} color="gray" />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                            placeholder='Enter Password'
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>
                        Keep me logged in
                    </Text>

                    <Text style={{ color: "#007FFF", fontWeight: '500' }}>
                        Forgot Password?
                    </Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <TouchableOpacity
                        onPress={handleRegister}
                        style={{
                            width: 200,
                            backgroundColor: "#FEBE10",
                            borderRadius: 10,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 15,
                        }}>
                        <Text style={{ color: "white", textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{ marginTop: 20 }}>
                        <Text style={{ color: "gray" }}>
                            Already have an account? Sign in instead!
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})