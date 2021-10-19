import React from 'react';
import { KeyboardAvoidingView, View } from "react-native";
import { Appbar } from "react-native-paper";
import { useAuth } from "@/hooks";
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
      <Header title="Ajustes" showBack={false} renderRight={<Appbar.Action icon="logout" onPress={() => { signOut(); navigation.navigate("Landing"); }} />} />
      <Screen
        error={error}
        navigation={navigation}
        onShowError={resetError}
        notifyError="notify"
      >

      </Screen>

    </View>
  )
};

export default SettingsView;
