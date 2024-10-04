import React, { createContext, useContext, useState, useRef, ReactNode } from "react";
import { Animated } from "react-native";
import Notification from "../utils/notification";

type NotificationType = "success" | "error";

interface NotificationContextProps {
  showNotification: (type: NotificationType, message: string) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<{ type: NotificationType; message: string } | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showNotification = (type: NotificationType, message: string) => {
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
    <NotificationContext.Provider value={{ showNotification }}>
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
