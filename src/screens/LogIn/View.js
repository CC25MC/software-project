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
import { notify } from "@/utils";

const LogInView = ({
  error,
  resetError,
  signIn,
  loading,
  setLoading,
  navigation,
  handleChangeForm,
  shouldEnableLogin,
  email,
  password,
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
            <Input
              mode="outlined"
              label="Correo"
              onChangeText={(newValue) =>
                handleChangeForm("email", newValue)
              }
              value={email}
            />
            <Spacing top={15} />
            <InputWithCensorToggle
              mode="outlined"
              label="Contraseña"
              onChangeText={(newValue) =>
                handleChangeForm("password", newValue)
              }
              value={password}
            />
            <Spacing top={10} />
            {/* <Touchable
              ml={15}
              onPress={() => {
                navigation.navigate("Reset");
              }}
            >
              <Text color={Colors.primary}>
                Recuperar Contraseña!!!
              </Text>
            </Touchable> */}

          </Box>

        </KeyboardAvoidingView>
      </Screen>
      <Box position="absolute" w={"100%"} bottom={20} p={20}>
        <Button
          self="center"
          w={"100%"}
          type="secondary"
          loading={loading}
          disableHover
          onPress={async () => {
            setLoading(true);
            const { user, error } = await signIn(email, password);
            setLoading(false)
            if (user) {
              notify.success({
                title: "Bienvenido",
              });
            } else {
              notify.error({
                title: error?.message,
              });
            }

          }}
        >
          <Text mt={6} fontSize={16} color={Colors.primary} center>INGRESA</Text>
        </Button>
      </Box>

    </View>
  )
};

export default LogInView;
