import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, Platform } from "react-native";
import { Appbar, FAB, Paragraph, Dialog, Portal, Card, Title, Badge } from "react-native-paper";
import { useAuth, supabase, supabaseAxios } from "@/hooks";
import { Picker } from '@react-native-picker/picker';
import { DateTime } from "luxon";
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
  ResponsiveImage
} from "@/components";
import { Images } from '@/assets';
import { Tokens, Colors } from '@/theme';
import { isWeb, notify } from "@/utils";

const Modal = ({ handleChangeForm, enunciado, updateData, mode, decision, hideDialog, close, visible, saveData }) => {
  return <Portal>
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title>{mode === "update" ? "Actualizar" : "Nueva Agenda"}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{mode === "update" ? "Actualiza los puntos tratados en la reunion de ser necesario" : "Por favor ingresa todos los puntos tratados en la reunión:"} </Paragraph>
        <Spacing top={Tokens.unit(2)} />
        <Input
          mode="outlined"
          multiline
          label="Enunciado"
          numberOfLines={2}
          h={"100%"}
          onChangeText={(newValue) =>
            handleChangeForm("enunciado", newValue)
          }
          value={enunciado}
        />
        <Spacing top={Tokens.unit(2)} />
        <Picker
          style={{ height: 40, fontSize: 16, padding: 8 }}
          selectedValue={decision}
          onValueChange={(itemValue, itemIndex) =>
            handleChangeForm("decision", itemValue)
          }>
          <Picker.Item label="Selecciona una decision (si es necesaria)" value="informacion" />
          <Picker.Item label="Aprobado" value="Aprobado" />
          <Picker.Item label="Diferido" value="Diferido" />
          <Picker.Item label="Diferido Virtual" value="Diferido Virtual" />
          <Picker.Item label="Rechazado" value="Rechazado" />
          <Picker.Item label="Retirado" value="Retirado" />

        </Picker>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          bg={"#FFFFFF"}
          bc={Colors.primary}
          bw={2}
          onPress={close}>
          <Text color={Colors.primary} center>Cerrar</Text>
        </Button>
        <Spacing left={Tokens.unit(2)} />
        <Button onPress={mode === "update" ? updateData : saveData}>{mode === "update" ? "Actualizar" : "Guardar"}</Button>
        <Spacing left={Tokens.unit(2)} />
      </Dialog.Actions>
    </Dialog>
  </Portal>
}

const HomeView = ({
  navigation,
  consejero,
  enunciado,
  decision,
  reset,
  handleChangeForm,
  setValues,
  values
}) => {
  const { signOut, getPerfil, getPuntos, getAgenda } = useAuth();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("savedata");
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const saveData = async () => {
    const { Perfil } = await getPerfil();
    if (Perfil[0]?.nombre_c) {
      if (Platform.OS === "web") {
        const { data, error } = await supabase
          .from('Puntos')
          .insert({
            Consejero: Perfil[0]?.nombre_c,
            Enunciado: enunciado,
            Decision: decision,
            id_consejo: Perfil[0]?.id_consejo,
          })
        if (data[0]?.id) {
          await supabaseAxios.post(`/Agenda`, {
            Puntos: data[0].id,
            id_consejo: Perfil[0]?.id_consejo,
          })
          notify.success({
            title: "Agenda Creada Satisfactoriamente",
          });
        }
      } else {
        const { data } = await supabaseAxios.post(`/Puntos`, {
          Consejero: Perfil[0]?.nombre_c,
          Enunciado: enunciado,
          Decision: decision,
          id_consejo: Perfil[0]?.id_consejo,
        })
        notify.success({
          title: "Agenda Creada Satisfactoriamente",
        });
      }
      getData();
      hideDialog();
      reset();
    } else {
      notify.error({
        title: "No pertenes a ningun consejo"
      });
    }
  }

  const getData = async () => {
    const { Puntos } = await getPuntos();
    const { Agenda } = await getAgenda();
    // console.log(Agenda, Puntos);
    setData(Puntos);
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteAgenda = async (id) => {
    await supabaseAxios.delete(`/Agenda?Puntos=eq.${id}`)
    await supabaseAxios.delete(`/Puntos?id=eq.${id}`)
    notify.success({
      title: "Agenda Eliminada Satisfactoriamente",
    });
    getData();
  }

  const selecAgenda = (item) => {
    // console.log(item);
    setValues({ consejero: item?.consejero, enunciado: item?.enunciado, decision: item?.decision, id: item?.id })
    setMode("update");
    showDialog();
  }

  const updateData = async () => {
    if (Platform.OS === "web") {
      const { data, error } = await supabase
        .from('Puntos')
        .update({ Enunciado: enunciado, Decision: decision })
        .eq('id', values?.id)

      if (error) {
        notify.error({
          title: "Ocurrio un error intentando actualizar",
        });
      } else {
        notify.success({
          title: "Agenda Actualizada Satisfactoriamente",
        });
      }
    } else {
      notify.error({
        title: "Ocurrio un error al intentar actualizar"
      });
    }

    getData();
    setMode("savedata");
    hideDialog();
    reset();
  }
  const Item = ({ consejero, date, enunciado, decision, id }) => {
    let LeftContent = props => <Badge {...props} style={{ marginRight: 10, }} >{decision}</Badge>;
    return (
      <Card style={{ marginBottom: 20 }}>
        <Card>
          <Card.Title title={`Agenda Del día ${date}`} subtitle={`Por el consejero ${consejero}`} right={LeftContent} />
          <Card.Content>
            <Title>Puntos</Title>
            <Paragraph>{enunciado}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button bg={"red"} onPress={() => deleteAgenda(id)} >Eliminar</Button>
            <Button onPress={() => selecAgenda({ consejero, date, enunciado, decision, id })} >Editar</Button>
          </Card.Actions>
        </Card>
      </Card>
    );
  }
  const renderItem = ({ item }) => (

    <Item consejero={item.Consejero} date={Platform.OS === "web" ? DateTime.fromISO(item?.created_at).toLocaleString(DateTime.DATE_FULL) : item?.created_at} enunciado={item?.Enunciado} decision={item?.Decision} id={item?.id} />
  );

  if (!data) {
    return <View style={{ backgroundColor: "white", height: "100%" }}>
      <Text center top={100} >
        Cargando
      </Text>
    </View>
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title="Inicio" showBack={false} renderRight={<Appbar.Action icon="logout" onPress={() => signOut()} />} />
      <SafeAreaView style={{ height: "100%", backgroundColor: "white", paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          ListEmptyComponent={
            <Box>
              <Text fontSize={36} center>
                Upss!!! no hay nada por aqui, por favor crea una nueva Agenda.
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

      <Modal handleChangeForm={handleChangeForm} close={() => { hideDialog(); reset(); setMode("savedata") }} updateData={updateData} mode={mode} enunciado={enunciado} decision={decision} hideDialog={hideDialog} reset={reset} visible={visible} saveData={saveData} />

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

export default HomeView;
