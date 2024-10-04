import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Controller, Control, FieldValues } from "react-hook-form";

interface FormInputControllerProps {
  control: Control<FieldValues, any>;
  name: string;
  placeholder: string;
}

const FormInputController: React.FC<FormInputControllerProps> = ({
  control,
  name,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={value}
          multiline
          onBlur={onBlur}
          onChangeText={onChange}
        />
      )}
    />
  );
};

export default FormInputController;

const styles = StyleSheet.create({
  input: {
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    paddingLeft: 20,
    fontSize: 18,
    backgroundColor: "#fff",
  },
});
