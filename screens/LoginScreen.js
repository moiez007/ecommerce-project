import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native"
const LoginScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <View>
                <Image source={require('../assets/amazon.png')}
                    style={{ marginTop: 40, height: 100, width: 200 }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: "#041E42", marginTop: 12 }}>Log in to your Account</Text>
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
                        <Ionicons style={{ marginLeft: 8 }} name="mail" size={24} color="gray" />
                        <TextInput
                            value={email}
                            onChangeText={(text)=>setEmail(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                            placeholder='Enter your email'
                        />
                    </View>
                </View>
                <View style={{ }}>
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
                        <Feather style = {{marginLeft: 8}}name="lock" size={24} color="gray" />
                        <TextInput
                            value={password}
                            onChangeText={(text)=>setPassword(text)}
                            secureTextEntry= {true}
                            style={{ color: "gray", marginVertical: 10, width: 300 }}
                            placeholder='Enter Password'
                        />
                    </View>
                </View>
                <View style={{marginTop: 10, flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text>
                        Keep me logged in
                    </Text>

                    <Text style = {{color: "#007FFF", fontWeight: '500'}}>
                        Forgot Password? 
                    </Text>
                </View>
                <View style = {{marginTop: 70}}>
                    <TouchableOpacity style = {{
                        width: 200,
                        backgroundColor: "#FEBE10",
                        borderRadius: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 15,                  
                    }}>
                        <Text style = {{color: "white",textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Register")}
                    style={{marginTop: 20}}>
                    <Text style = {{color: "gray"}}>
                        Don't have an account? Sign up instead!
                    </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})