import React from "react";
import { Text, Animated, StyleSheet } from "react-native";
import { aligned } from "./responsive";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type NotificationProps = {
  type: "success" | "error";
  message: string;
  fadeAnim: Animated.Value;
};

const Notification: React.FC<NotificationProps> = ({ type, message, fadeAnim }) => {
  return (
    <Animated.View
      style={[
        styles.notification,
        type === "success"
          ? styles.notificationSuccess
          : styles.notificationError,
        { opacity: fadeAnim },
      ]}
    >
      {type === "success" ? (
        <AntDesign name="checkcircle" size={24} color="white" />
      ) : (
        <MaterialIcons name="error" size={24} color="white" />
      )}
      <Text style={styles.notificationText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    bottom: aligned(20),
    alignSelf: "center",
    padding: aligned(10),
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
  },
  notificationSuccess: {
    backgroundColor: "#30d15b",
  },
  notificationError: {
    backgroundColor: "#de1d26",
  },
  notificationText: {
    color: "white",
    textAlign: "center",
    fontSize: aligned(16),
    marginRight: aligned(30),
  },
});

export default Notification;
