import { useState } from 'react';
import { notify } from "@/utils";


const ResetActions = ({ navigation }) => {
  const [values, setValues] = useState({
    password: "",
    id: "",
  });
  const [change, setChange] = useState(false);
  const {
    password,
    id,
  } = values;
  const handleChangeForm = (name, newValue) =>
    setValues({
      ...values,
      [name]: newValue,
    });

  const handleLogin = () => {
    console.log(values);
    if (id === "27276551") {
      notify.success({
        title: "Cedula verificada Satisfactoriamente",
      });
      setChange(!change);
    }else{
      notify.error({
        title: "Cedula no encontrada en la base de datos",
      });
    }
  };
  return {
    handleChangeForm,
    handleLogin,
    change,
    setChange,
    navigation,
    password,
    id,
  };
};

export default ResetActions;
