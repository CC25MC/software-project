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

const ProfileView = ({
  error,
  resetError,
  navigation,
}) => {
  const { getPerfil, getConsejoId } = useAuth();

  const [data, setData] = useState({
    nombre_c: "",
    cedula: 0,
    phone: "",
    id_consejo: 0,
    id: 0,
    consejo: ""
  });

  const handleChangeForm = (name, newValue) =>
    setData({
      ...data,
      [name]: newValue,
    });

  const getData = async () => {
    const { Perfil } = await getPerfil();
    const { Consejo } = await getConsejoId(Perfil[0]?.id_consejo);
    setData({ nombre_c: Perfil[0]?.nombre_c, cedula: Perfil[0]?.cedula, phone: Perfil[0]?.phone, id_consejo: Perfil[0]?.id_consejo, id: Perfil[0]?.id, consejo: Consejo[0]?.name });
  }

  useEffect(() => {
    getData();
  }, []);

  const updateProfile = async () => {
    const { data: res, error } = await supabase
      .from('Perfil')
      .update({ nombre_c: data?.nombre_c, phone: data?.phone })
      .eq('id', data.id)
    if (res) {
      notify.success({
        title: "Perfil Actualizado Satisfactoriamente",
      });
    } else {
      notify.error({
        title: "Ah Ocurrido un error inesperado",
      });
    }

    // try {
    //   await supabaseAxios.put(`/Perfil?id=eq.${data.id}`, { nombre_c: data.nombre_c, phone: data.phone });
    //   notify.success({
    //     title: "Perfil Actualizado Satisfactoriamente",
    //   });
    // } catch (error) {
    //   notify.error({
    //     title: "Ah Ocurrido un error inesperado",
    //   });
    // }
  }


  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title="Perfil" showBack={true} back={true} />

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
              handleChangeForm("nombre_c", newValue)
            }
            value={data?.nombre_c}
          />
          <Spacing top={10} />
          <Input
            mode="outlined"
            label="Cédula"
            disabled={true}
            onChangeText={(newValue) =>
              handleChangeForm("cedula", newValue)
            }
            value={data?.cedula}
          />
          <Spacing top={10} />
          <Input
            mode="outlined"
            label="Consejo"
            disabled={true}
            onChangeText={(newValue) =>
              handleChangeForm("consejo", newValue)
            }
            value={data?.consejo}
          />
          <Spacing top={10} />
          <Input
            mode="outlined"
            label="Telefono"
            onChangeText={(newValue) =>
              handleChangeForm("phone", newValue)
            }
            value={data?.phone}
          />
          <Spacing top={10} />
        </Box>
      </Screen>
      <Box position="absolute" w={"100%"} bottom={20} p={20}>
        <Button
          self="center"
          w={"100%"}
          type="secondary"
          disableHover
          onPress={updateProfile}
        >
          <Text mt={6} fontSize={16} color={Colors.primary} center>Actualizar Datos</Text>
        </Button>
      </Box>
    </View>
  )
};

export default ProfileView;
