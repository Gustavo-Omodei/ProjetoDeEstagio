import { useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormContainer, InputArea, Label, Input, Button } from "./FormStyles";

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
    const formData = new FormData(e.target);
    const payload = {};

    for (let field of fields) {
      const value = formData.get(field.name);
      if (!value) {
        toast.error(`Preencha o campo ${field.label}!`);
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
        toast.success(`${endpoint.slice(0, -1)} editado com sucesso!`);
      } else {
        await axios.post(`http://localhost:8800/${endpoint}`, payload);
        toast.success(`${endpoint.slice(0, -1)} criado com sucesso!`);
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
          <InputArea
            key={field.name}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1 }}>
              <Label>{field.label}</Label>
              {field.type === "select" ? (
                <select name={field.name}>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder || ""}
                />
              )}
            </div>

            {/* Botão extra, só aparece se field.addButton existir */}
            {field.addButton && (
              <Button
                type="button"
                style={{ marginLeft: "10px", height: "36px" }}
                onClick={field.addButton.onClick}
              >
                {field.addButton.label}
              </Button>
            )}
          </InputArea>
        ))}
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};
export default Form;
