import React,{useState} from 'react';
import { KeyboardAvoidingView, View } from "react-native";
import { supabase } from "@/hooks";
import {
    Touchable,
    Title,
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
import { Colors } from '@/theme';
import { isWeb } from "@/utils";

const ResetView = ({
    error,
    resetError,
    navigation,
}) => {
    const [advice, setAdvice] = useState("");

    const saveData = async () => {
        await supabase
            .from('Consejo')
            .insert({ name: advice });
    }
    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <Header title="Recuperar Contraseña" showBack={true} back={true} />
            <Screen
                error={error}
                navigation={navigation}
                onShowError={resetError}
                notifyError="notify"
            >
                <Input
                    mode="outlined"
                    label="Nuevo Consejo"
                    h={"100%"}
                    onChangeText={(newValue) =>
                        setAdvice(newValue)
                    }
                    value={advice}
                />
            </Screen>
            <Box position="absolute" w={"100%"} bottom={20} p={20}>
                <Button
                    self="center"
                    w={"100%"}
                    bg={"#FFFFFF"}
                    bc={Colors.primary}
                    bw={4}
                    disableHover
                    onPress={saveData}
                >
                    <Text mt={6} fontSize={16} color={Colors.primary} center>Crear Nuevo Consejo</Text>
                </Button>
            </Box>

        </View>
    )
};

export default ResetView;
