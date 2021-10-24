import { useState } from 'react';
import { useAuth } from "@/hooks";

const LogInActions = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { signIn, setAuth } = useAuth();
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

  return {
    handleChangeForm,
    signIn,
    loading, 
    setLoading,
    setAuth,
    navigation,
    password,
    email,
  };
};

export default LogInActions;
