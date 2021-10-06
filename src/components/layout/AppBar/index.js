import React from "react";
import { Appbar as RNPAppBar } from "react-native-paper";

import { withStyleProps } from "@/hocs";
import {  Colors } from '@/theme';
import { isWeb } from "@/utils";

const Appbar = withStyleProps(RNPAppBar);

export const AppBar = ({ children, ...props }) => {
  return (
    <Appbar
        bg={Colors.primary}
        bbc={Colors.primary}
        boxShadow="none"
        top={isWeb() ? 0 : 25}
        h={isWeb() ? 0 : 60}
        bbw={1}
        {...props}
    >
        {children}
    </Appbar>
  );
};
