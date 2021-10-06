import { View } from 'react-native';
import React from 'react';
import {
  Title,
  Button,
  Col,
  Text,
  Spacing,
  Box,
  ResponsiveImage,
} from "@/components";
import { Images } from '@/assets';
import { Tokens, Colors } from '@/theme';
import { isWeb } from "@/utils";


const Landing = ({ navigation }) => (
  <View style={{ backgroundColor: Colors.primary, height: "100%" }} >
    <ResponsiveImage
      initialWidth={200}
      initialHeight={200}
      source={Images.logo}
      containerProps={{
        self: "center",
        top: -20,
        mr: 5,
      }}
    />
    <ResponsiveImage
      initialWidth={isWeb() ? 520 : 320}
      initialHeight={isWeb() ? 520 :320}
      source={Images.Schedule}
      containerProps={{
        self: "center",
        top: -0,
        mr: 5,
      }}
    />
    <Box p={20} position="absolute" bottom={0.1} roundness={40} style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, }} w={"100%"} bg={"white"}>
      <Col self="center" maxW={400} pt={Tokens.unit(1)} mb={Tokens.unit(3)}>
        <Title bold center color={Colors.primary}>
          AGENDA DE CONSEJO UNEGISTA
        </Title>
        <Spacing top={Tokens.unit(5)} />
        <Button
          self="center"
          w={300}
          bg={Colors.primary}
          disableHover
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text mt={6} fontSize={16} color={"white"} center>INGRESA</Text>
        </Button>
        <Spacing top={Tokens.unit(2)} />
        <Button
          self="center"
          w={300}
          bg={"#FFFFFF"}
          bc={Colors.primary}
          bw={2}
         
          disableHover
          onPress={() => {
            navigation.navigate("SingUp");
          }}
        >
          <Text mt={6} fontSize={16} color={Colors.primary} center>REGISTRATE</Text>
        </Button>
      </Col>
    </Box>
  </View>
);

export default Landing;
