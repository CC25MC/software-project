import React from 'react';
import { KeyboardAvoidingView, View } from "react-native";
import { Appbar } from "react-native-paper";
import { useAuth } from "@/hooks";
import { Ionicons } from '@expo/vector-icons';

import {
  Touchable,
  // Col,
  // InputRutRaw,
  Input,
  InputWithCensorToggle,
  // Row,
  Box,
  Header,
  Button,
  Spacing,
  Row,
  Text,
  Screen,
} from "@/components";
// import { Images } from '@/assets';
import { Colors } from '@/theme';
// import { isWeb } from "@/utils";

const SettingsView = ({
  error,
  resetError,
  loading,
  navigation,
  handleChangeForm,
  shouldEnableLogin,
  email,
  password,
  handleLogin,
  onEnterPress,
}) => {
  const { signOut } = useAuth();
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title="Ajustes" showBack={false} renderRight={<Appbar.Action icon="logout" onPress={() => signOut()} />} />

      <Box h={"100%"} top={20} p={20}>
        
        <Touchable w={"100%"} onPress={() => {
          navigation.navigate("Perfil");
        }} p={20} bg={Colors.gray} roundness={10}>
          <Row>
            <Text fontSize={20} >
              Perfil
            </Text>
            <Ionicons name={"arrow-forward"} size={20} style={{ marginLeft: "auto" }} color={Colors.primary} />
          </Row>
        </Touchable>
        <Spacing top={20} />
        <Touchable w={"100%"} onPress={() => {
          navigation.navigate("Consejo");
        }} p={20} bg={Colors.gray} roundness={10}>
          <Row>
            <Text fontSize={20} >
              Añadir nuevo consejo
            </Text>
            <Ionicons name={"arrow-forward"} size={20} style={{ marginLeft: "auto" }} color={Colors.primary} />
          </Row>
        </Touchable>
        <Spacing top={20} />
        <Touchable onPress={() => signOut()} w={"100%"} p={20} bg={Colors.gray} roundness={10}>
          <Row>
            <Text fontSize={20} >
              Cerrar Sesión
            </Text>
            <Ionicons name={"arrow-forward"} size={20} style={{ marginLeft: "auto" }} color={Colors.primary} />
          </Row>
        </Touchable>

      </Box>



    </View>
  )
};

export default SettingsView;
