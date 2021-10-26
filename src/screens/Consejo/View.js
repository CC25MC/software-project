import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList } from "react-native";
import { FAB, Paragraph, Dialog, Portal, } from "react-native-paper";
import { supabase, useAuth, supabaseAxios } from "@/hooks";
import { Ionicons } from '@expo/vector-icons';

import {
  Touchable,
  Col,
  // InputRutRaw,
  Input,
  InputWithCensorToggle,
  Row,
  Box,
  Header,
  Button,
  Spacing,
  Text,
  Screen,
  ResponsiveImage
} from "@/components";
import { Images } from '@/assets';
import { Colors, Tokens } from '@/theme';
import { isWeb, notify } from "@/utils";

const ConsejoView = ({
  error,
  resetError,
  navigation,
}) => {
  const { getConsejo } = useAuth();

  const [advice, setAdvice] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("savedata");
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getData = async () => {
    const { Consejo } = await getConsejo();
    setData(Consejo);
  }

  useEffect(() => {
    getData();
  }, []);

  const saveData = async () => {
    await supabaseAxios.post("/Consejo", { name: advice })
    notify.success({
      title: "Consejo Agregado Satisfactoriamente",
    });
    getData();
    hideDialog();
  }

  const deleteConsejo = async (id) => {
    try {
      await supabaseAxios.delete(`/Consejo?id=eq.${id}`);
      notify.success({
        title: "Consejo Eliminado Satisfactoriamente",
      });
    } catch (error) {
      notify.error({
        title: "No se puede eliminar este consejo",
      });
    }
    getData();
  }
  const Item = ({ name, id }) => (
    <Box w={"100%"} roundness={20} bg={Colors.gray} mb={30} p={20} >
      <Row>
        <Text center fontSize={20}>
          {name}
        </Text>

        <Ionicons name={"pencil"} onPress={showDialog} size={20} style={{ marginLeft: "auto" }} color={Colors.primary} />
        <Ionicons name={"remove"} onPress={() => deleteConsejo(id)} size={30} style={{ marginLeft: 30 }} color={Colors.error} />

      </Row>

    </Box>
  )

  const renderItem = ({ item }) => (
    <Item name={item?.name} id={item?.id} />
  );

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title="Consejo" showBack={true} back={true} />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{"Nueva Consejo"}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{"Por favor ingresa el nombre del Nuevo Consejo Universitario"} </Paragraph>
            <Spacing top={Tokens.unit(2)} />
            <Input
              mode="outlined"
              label="Nuevo Consejo"
              h={"100%"}
              onChangeText={(newValue) =>
                setAdvice(newValue)
              }
              value={advice}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              bg={"#FFFFFF"}
              bc={Colors.primary}
              bw={2}
              onPress={hideDialog}>
              <Text color={Colors.primary} center>Cerrar</Text>
            </Button>
            <Spacing left={Tokens.unit(2)} />
            <Button onPress={saveData}>{"Crear Nuevo Consejo"}</Button>
            <Spacing left={Tokens.unit(2)} />
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <SafeAreaView style={{ height: "100%", backgroundColor: "white", paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          ListEmptyComponent={
            <Box>
              <Text fontSize={36} center>
                Upss!!! no hay nada por aqui, por favor crea un nuevo consejo.
              </Text>
              <Spacing top={Tokens.unit(5)} />

              <ResponsiveImage
                initialWidth={isWeb() ? 400 : 200}
                initialHeight={isWeb() ? 400 : 200}
                source={Images.list}
                containerProps={{
                  self: "center",
                  top: -0,
                  mr: 5,
                }}
              />
            </Box>
          }
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: Colors.primary,
        }}
        icon="plus"
        onPress={showDialog}
      />
    </View>
  )
};

export default ConsejoView;
