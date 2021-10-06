import { KeyboardAvoidingView, View, ScrollView } from "react-native";
import { List } from "react-native-paper";

import React from 'react';
import {
  Touchable,
  Col,
  InputRutRaw,
  Input,
  InputWithCensorToggle,
  Row,
  Box,
  Header,
  Button,
  Spacing,
  Text,
  Screen,
} from "@/components";
import { Images } from '@/assets';
import { Tokens, Colors } from '@/theme';
import { isWeb } from "@/utils";

const academy = [
  {
    title: "Consejo Universitario",
  },
  {
    title: "Consejo Administrativo",
  },
  {
    title: "Consejo Académico",
  },
  {
    title: "Consejo de Investigación y Postgrado",
  },
  {
    title: "Consejo de Departamental",
  },
];

const SignUpView = ({
  error,
  resetError,
  loading,
  navigation,
  handleChangeForm,
  shouldEnableLogin,
  rut,
  password,
  handleLogIn,
  onEnterPress,
}) => {


  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title="Registro" showBack={true} back={true} />
      <Screen
        error={error}
        navigation={navigation}
        onShowError={resetError}
        notifyError="notify"
      >
        <ScrollView behavior={"position"} keyboardVerticalOffset={82} showsVerticalScrollIndicator={false}>
          <Box w={"100%"}>
            <Input mode="outlined" label="Nombre Completo" />
            <Spacing top={10} />
            <Input mode="outlined" label="Cédula" />
            <Spacing top={10} />
            <Input mode="outlined" label="Email" />
            <Spacing top={10} />
            <List.Accordion
              title="Consejos"
              left={props => <List.Icon {...props} icon="folder" />}>
              <List.Item title="Consejo Universitario" onPress={() => { console.log("aqui") }} left={props => <List.Icon {...props} icon="folder" />} />
              <List.Item title="Consejo Administrativo" onPress={() => {console.log("aqui")}} />
              <List.Item title="Consejo Académico" onPress={() => {console.log("aqui")}} />
              <List.Item title="Consejo de Investigación y Postgrado" onPress={() => {console.log("aqui")}} />
              <List.Item title="Consejo Departamental" onPress={() => {console.log("aqui")}} />
            </List.Accordion>
            {/* <Input mode="outlined" label="Concejo" /> */}
            <Spacing top={10} />
            <InputWithCensorToggle mode="outlined" label="Contraseña" />
            <Spacing top={10} />
            <InputWithCensorToggle mode="outlined" label="Repetir Contraseña" />
            <Spacing top={150} />

            <Button
              self="center"
              w={"100%"}
              bg={"#FFFFFF"}
              bc={Colors.primary}
              bw={4}
              disableHover
              onPress={() => {
                navigation.navigate("SingUp");
              }}
            >
              <Text mt={6} fontSize={16} color={Colors.primary} center>REGISTRATE</Text>
            </Button>
          </Box>

        </ScrollView>
      </Screen>

    </View>
  );
};

export default SignUpView;
