import { useState } from 'react';
import { supabase, useAuth } from "@/hooks";

const HomeActions = ({ navigation }) => {
  const [values, setValues] = useState({
    consejero: "",
    enunciado: "",
    decision: "informacion",
  });

  const {
    consejero,
    enunciado,
    decision } = values;

  const handleChangeForm = (name, newValue) => {
    setValues({
      ...values,
      [name]: newValue,
    });
  }
  
  const reset = () =>{
    setValues({
      consejero: "",
      enunciado: "",
      decision: "",
    });
  }

  return {
    consejero,
    enunciado,
    decision,
    handleChangeForm,
    reset,
    setValues,
    values
  };
};

export default HomeActions;
