import React, { createContext, useContext, useState, useRef } from "react";
import { Animated } from "react-native";
import Notification from "../notification";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showNotification = (type, message) => {
    setNotification({ type, message });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setNotification(null));
      }, 2000);
    });
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          fadeAnim={fadeAnim}
        />
      )}
    </NotificationContext.Provider>
  );
};
