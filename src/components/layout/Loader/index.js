import React from "react";

import { Col, Spinner, Spacing, Text } from "@/components";
import { Tokens } from "@/theme";

const tips = "Por favor espera";

export const Loader = ({ noTip }) => {
  return (
    <Col m="auto">
      <Spinner />
      {!noTip && (
        <Col maxW={250}>
          <Spacing top={Tokens.unit(1)} />
          <Text center subtitle bold>
            {"Cargando"}
          </Text>
          <Spacing top={Tokens.unit(2)} />
          <Text center>{tips[0]}</Text>
        </Col>
      )}
    </Col>
  );
};
