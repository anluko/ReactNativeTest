import { React } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";

const CommentInputController = ({
  control,
  name,
  placeholder,
  onSubmitEditing,
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
