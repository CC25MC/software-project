import { useState } from 'react';

const LogInActions = ({ navigation }) => {
  const [values, setValues] = useState({
    password: "",
    email: "",
  });
  const {
    password,
    email,
  } = values;
  const handleChangeForm = (name, newValue) =>
    setValues({
      ...values,
      [name]: newValue,
    });

  const handleLogin = () => {
    console.log(values);
  };
  return {
    handleChangeForm,
    handleLogin,
    navigation,
    password,
    email,
  };
};

export default LogInActions;
