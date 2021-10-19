import { useState, useEffect } from 'react';
import { useAuth, supabase } from "@/hooks";

const SignUpActions = ({ navigation }) => {
  const { signUp, getConsejo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [Consejo, setConsejo] = useState({});
  

  const [values, setValues] = useState({
    name: "",
    password: "",
    repeatPassword: "",
    id: "",
    phone: "",
    email: "",
    advice: "Consejo",
    id_advice: 0
  });
  const {
    name,
    password,
    repeatPassword,
    id,
    phone,
    email,
    advice,
    id_advice } = values;
  const handleChangeForm = (name, newValue, id) => {
    if (id) {
      setValues({
        ...values,
        [name]: newValue, ["id_advice"]: id
      });
    } else {
      setValues({
        ...values,
        [name]: newValue,
      });
    }
  }


  return {
    handleChangeForm,
    signUp,
    navigation,
    loading,
    setLoading,
    name,
    password,
    repeatPassword,
    id,
    phone,
    email,
    advice,
    id_advice,
    setConsejo,
    consejo: Consejo?.Consejo,
    error: Consejo?.error,
  };
};

export default SignUpActions;
