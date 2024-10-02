import { Button, Icon, Input, Text } from "native-base";
import React, { useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, View } from "react-native";
import CommonDataService from "../services/commondataservice";

export default function Home() {
  // const navigation = useNavigation();

  const [dataset, setDataset] = useState({ number:"", message:""})

  const commonDataService=new CommonDataService()

//   923246084459&message=test_message_from_victus

  const [token, setToken] = useState("");

  const handle_Login = () => {

    commonDataService
      .fetchData(`${dataset?.number}&message=${dataset?.message}`)
      .then((res) => {
        console.log("Resend :" + JSON.stringify(res));
        Alert.alert(
            "Success", // Title of the alert
             "message sent successfully", // Message of the alert
            [{ text: "OK" }] // Buttons array, with an OK button
          );
      })
      .catch(function (error) {
        if (error) {
         
          console.log(JSON.stringify(error.response?.data));
          Alert.alert(
            "Error", // Title of the alert
            error.response?.data, // Message of the alert
            [{ text: "OK" }] // Buttons array, with an OK button
          );
        }
      });
  };


  return (
    <SafeAreaView>
    
        <View style={{height:"100%", justifyContent:"center", borderWidth:1}}>
          <View style={{height:"70%", borderWidth:1}}>
            <Text alignSelf={"center"}>Smart SMS</Text>

            <Text>Enter Phone Number</Text>
            <Input
              returnKeyType="done"
              minHeight={45}
              value={dataset?.number}
              borderRadius="10"
              maxLength={12}
              placeholder="Enter Phone Number"
              focusOutlineColor={"white"}
              onChangeText={(value) => setDataset(c=>({...c, number:value}))}
            />
            <Text>Enter Message</Text>
            <Input
              returnKeyType="done"
              minHeight={45}
              borderRadius="10"
              value={dataset?.message}
                 placeholder="Enter Message"
              
    
              focusOutlineColor={"white"}
              onChangeText={(value) => setDataset(c=>({...c, message:value}))}
            />

            <Button
              radius={100}
              color={"amber.200"}
              width={"100%"}
              marginVertical={10}
              onPress={()=> handle_Login()}
            >
              <Text>Send</Text>
            </Button>
          </View>
        </View>

    </SafeAreaView>
  );
}
