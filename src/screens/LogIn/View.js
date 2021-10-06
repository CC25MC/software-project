import React from 'react';
import { KeyboardAvoidingView, View } from "react-native";
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
  Text,
  Screen,
} from "@/components";
// import { Images } from '@/assets';
import { Colors } from '@/theme';
// import { isWeb } from "@/utils";

const LogInView = ({
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
      <Header title="Login" showBack={true} back={true} />
      <Screen
        error={error}
        navigation={navigation}
        onShowError={resetError}
        notifyError="notify"
      >
        <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={82}>
          <Box w={"100%"}>
            <Input mode="outlined" label="Correo" />
            <Spacing top={15} />
            <InputWithCensorToggle mode="outlined" label="Contraseña" />
            <Spacing top={10} />
            <Touchable
              ml={15}
              // onPress={() => {
              //   navigation.navigate(URLS.formCompany);
              // }}
            >
              <Text color={Colors.primary}>
                Recuperar Contraseña!!!
              </Text>
            </Touchable>

          </Box>

        </KeyboardAvoidingView>
      </Screen>
      <Box position="absolute" w={"100%"} bottom={20} p={20}>
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
          <Text mt={6} fontSize={16} color={Colors.primary} center>INGRESA</Text>
        </Button>
      </Box>

    </View>
  )
};

export default LogInView;
