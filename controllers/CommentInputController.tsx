import React from "react";
import { StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from "react-native";
import { Controller, Control, FieldValues } from "react-hook-form";

interface CommentInputControllerProps {
  control: Control<FieldValues, any>;
  name: string;
  placeholder: string;
  onSubmitEditing?: TextInputProps["onSubmitEditing"];
  style?: StyleProp<ViewStyle>; 
}

const CommentInputController: React.FC<CommentInputControllerProps> = ({
  control,
  name,
  placeholder,
  onSubmitEditing,
  style
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
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChange}
          returnKeyType="send"
        />
      )}
    />
  );
};

export default CommentInputController;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingLeft: 15,
    fontSize: 18,
  },
});
