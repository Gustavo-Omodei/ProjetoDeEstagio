import { useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FormContainer,
  InputArea,
  Label,
  Input,
  Button,
} from "../styles/styles";

const Form = ({ onEdit, setOnEdit, getData, fields, endpoint }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit && ref.current) {
      const data = ref.current;
      fields.forEach((field) => {
        data[field.name].value = onEdit[field.name] || "";
      });
    }
  }, [onEdit, fields]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = ref.current;
    for (let field of fields) {
      if (!form[field.name].value) {
        toast.error(`Preencha o campo ${field.label}!`);
        return;
      }
    }

    const payload = {};
    fields.forEach((field) => {
      payload[field.name] = form[field.name].value;
    });

    try {
      if (onEdit) {
        await axios.put(
          `http://localhost:8800/${endpoint}}/${onEdit.id}`,
          payload
        );
        toast.success(`${endpoint.slice(0, -1)} editado com sucesso!`);
      } else {
        await axios.post(`http://localhost:8800/${endpoint}`, payload);
        toast.success(`${endpoint.slice(0, -1)} criado com sucesso!`);
      }
      fields.forEach((field) => {
        form[field.name].value = "";
      });
      setOnEdit(null);
      getData();
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao salvar dados");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        {fields.map((field) => (
          <React.Fragment key={field.name}>
            <Label>{field.label}</Label>
            <Input
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
            />
          </React.Fragment>
        ))}
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};
export default Form;
