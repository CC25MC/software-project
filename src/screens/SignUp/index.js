import React from "react";

import Actions from "./Actions";
import View from "./View";

const SignUpContainer = (props) => {
  const actions = Actions(props);

  return <View {...props} {...actions} />;
};

export default SignUpContainer;
