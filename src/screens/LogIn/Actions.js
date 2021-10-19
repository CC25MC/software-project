import { useState } from 'react';
import { useAuth } from "@/hooks";

const LogInActions = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
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
    navigation,
    password,
    email,
  };
};

export default LogInActions;
