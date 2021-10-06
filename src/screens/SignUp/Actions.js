import { useState } from 'react';

const SignUpActions = ({ navigation }) => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    repeatPassword: "",
    id: "",
    phone: "",
    email: "",
    advice: "Consejo",
  });
  const {
    name,
    password,
    repeatPassword,
    id,
    phone,
    email,
    advice } = values;
  const handleChangeForm = (name, newValue) =>
    setValues({
      ...values,
      [name]: newValue,
    });

  const handleSignUp = () => {
    console.log(values);
  };

  return {
    handleChangeForm,
    handleSignUp,
    navigation,
    name,
    password,
    repeatPassword,
    id,
    phone,
    email,
    advice
  };
};

export default SignUpActions;
