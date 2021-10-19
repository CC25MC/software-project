import { KeyboardAvoidingView, View, ScrollView, FlatList, RefreshControl } from "react-native";
import { List } from "react-native-paper";
import { useAuth, supabase } from "@/hooks";

import React, {useEffect} from 'react';
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
    const { data: Consejo, error } = await supabase
      .from('Consejo')
      .select('*')
    if (error) console.log('error', error)
    else setConsejo({Consejo, error})
  }
  useEffect(() => {
    fetchConsejo();
  }, []);
  console.log(id_advice, advice);
  const Item = ({ name, id }) => (
    <List.Item title={name} onPress={() => handleChangeForm("advice", name, id)} left={props => advice === name ? <List.Icon {...props} color={Colors.primary} icon="check" /> : null} />
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} id={item.id} />
  );

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title="Registro" showBack={true} back={true} />
      <Screen
        error={error}
        navigation={navigation}
        onShowError={resetError}
        notifyError="notify"
      >
        <ScrollView behavior={"position"} keyboardVerticalOffset={82} showsVerticalScrollIndicator={false} re>
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
            <List.Accordion
              title={advice}
              left={props => <List.Icon {...props} icon="folder" />}>
              {/* <List.Item title="Consejo Universitario" onPress={() => handleChangeForm("advice", "Consejo Universitario")} left={props => advice === "Consejo Universitario" ? <List.Icon {...props} color={Colors.primary} icon="check" /> : null} />
              <List.Item title="Consejo Administrativo" onPress={() => handleChangeForm("advice", "Consejo Administrativo")} left={props => advice === "Consejo Administrativo" ? <List.Icon {...props} color={Colors.primary} icon="check" /> : null} />
              <List.Item title="Consejo Académico" onPress={() => handleChangeForm("advice", "Consejo Académico")} left={props => advice === "Consejo Académico" ? <List.Icon {...props} color={Colors.primary} icon="check" /> : null} />
              <List.Item title="Consejo de Investigación y Postgrado" onPress={() => handleChangeForm("advice", "Consejo de Investigación y Postgrado")} left={props => advice === "Consejo de Investigación y Postgrado" ? <List.Icon {...props} color={Colors.primary} icon="check" /> : null} />
              <List.Item title="Consejo Departamental" onPress={() => handleChangeForm("advice", "Consejo Departamental")} left={props => advice === "Consejo Departamental" ? <List.Icon {...props} color={Colors.primary} icon="check" /> : null} /> */}

              <FlatList
                data={consejo}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </List.Accordion>
            {/* <Input mode="outlined" label="Concejo" /> */}

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
            <Spacing top={100} />

            <Button
              self="center"
              w={"100%"}
              bg={"#FFFFFF"}
              bc={Colors.primary}
              bw={4}
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
                  navigation.navigate("Dashboard");
                } else {
                  notify.error({
                    title: error?.message
                  });
                }

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
