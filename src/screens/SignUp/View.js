import { KeyboardAvoidingView, View, ScrollView, FlatList, RefreshControl } from "react-native";
import { Checkbox } from "react-native-paper";
import { supabaseAxios } from "@/hooks";

import React, { useEffect } from 'react';
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
import { isWeb, notify } from "@/utils";


const SignUpView = ({
  error,
  resetError,
  loading,
  setLoading,
  navigation,
  handleChangeForm,
  signUp,
  name,
  password,
  repeatPassword,
  id,
  phone,
  email,
  advice,
  consejo,
  setConsejo,
  id_advice
}) => {
  const fetchConsejo = async () => {
    const { data: Consejo, error } = await supabaseAxios.get("/Consejo")
    if (error) console.log('error', error)
    else setConsejo({ Consejo, error })
  }
  useEffect(() => {
    fetchConsejo();
  }, []);

  const Item = ({ name, id }) => (
    <Row pl={20}>
      <Checkbox status={advice === name ? 'checked' : 'unchecked'} color={Colors.primary} onPress={() => handleChangeForm("advice", name, id)} />
      <Text mt={10}>
        {name}
      </Text>
    </Row>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} id={item.id} />
  );

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title="Registro" showBack={true} back={true} />

      <FlatList
        ListHeaderComponent={
          <>
            <Screen
              error={error}
              navigation={navigation}
              onShowError={resetError}
              notifyError="notify"
            >
              <Box w={"100%"}>
                <Input
                  mode="outlined"
                  label="Nombre Completo"
                  onChangeText={(newValue) =>
                    handleChangeForm("name", newValue)
                  }
                  value={name}
                />
                <Spacing top={10} />
                <Input
                  mode="outlined"
                  label="Cédula"
                  onChangeText={(newValue) =>
                    handleChangeForm("id", newValue)
                  }
                  value={id}
                />
                <Spacing top={10} />
                <Input
                  mode="outlined"
                  label="Correo"
                  onChangeText={(newValue) =>
                    handleChangeForm("email", newValue)
                  }
                  value={email}
                />
                <Spacing top={10} />
                <Input
                  mode="outlined"
                  label="Telefono"
                  onChangeText={(newValue) =>
                    handleChangeForm("phone", newValue)
                  }
                  value={phone}
                />
                <Spacing top={10} />
              </Box>
            </Screen>
          </>
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <Screen
              error={error}
              navigation={navigation}
              onShowError={resetError}
              notifyError="notify"
            >
              <Spacing top={10} />
              <InputWithCensorToggle
                mode="outlined"
                label="Contraseña"
                onChangeText={(newValue) =>
                  handleChangeForm("password", newValue)
                }
                value={password}
              />
              <Spacing top={10} />
              <InputWithCensorToggle
                mode="outlined"
                label="Repetir Contraseña"
                onChangeText={(newValue) =>
                  handleChangeForm("repeatPassword", newValue)
                }
                value={repeatPassword}
              />
              <Spacing top={30} />

              <Button
                self="center"
                w={"100%"}
                type="secondary"
                disableHover
                disabled={repeatPassword === password ? false : true}
                loading={loading}
                onPress={async () => {
                  setLoading(true);
                  const { user, error } = await signUp(email, password, phone, name, id, id_advice);
                  setLoading(false)
                  if (user) {
                    notify.success({
                      title: "Usuario Registrado Satisfactoriamente",
                    });
                  } else {
                    notify.error({
                      title: error?.message
                    });
                  }

                }}
              >
                <Text mt={6} fontSize={16} color={Colors.primary} center>REGISTRATE</Text>
              </Button>
            </Screen>
          </>
        }
        data={consejo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />



    </View>
  );
};

export default SignUpView;
