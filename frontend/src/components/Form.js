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
  Select,
} from "../styles/styles";

const Form = ({ title, onEdit, setOnEdit, getData, fields, endpoint }) => {
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
    const formData = new FormData(e.target);
    const payload = {};

    for (let field of fields) {
      const value = formData.get(field.name);
      if (!value) {
        toast.error(`Preencha o campo "${field.label}"!`);
        return;
      }
      payload[field.name] = value;
    }

    // envio via axios
    try {
      if (onEdit) {
        await axios.put(
          `http://localhost:8800/${endpoint}/${onEdit.id}`,
          payload
        );
        toast.success(`${title} editado com sucesso!`);
        setOnEdit({ ...onEdit, ...payload });
      } else {
        await axios.post(`http://localhost:8800/${endpoint}`, payload);
        toast.success(`${title} criado com sucesso!`);
        setOnEdit({ ...onEdit, ...payload });
      }
      setOnEdit(null);
      getData();
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar dados");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        {fields.map((field) => (
          <InputArea key={field.name}>
            <Label>{field.label}</Label>
            {field.type === "select" ? (
              <Select name={field.name}>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder || ""}
              />
            )}
          </InputArea>
        ))}
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};
export default Form;
