import { StyleSheet } from "react-native";
import MainStack from "./navigate";
import { Provider } from "react-redux";
import { NotificationProvider } from "./context/NotificationContext";
import { store } from "./store/store";

export default function App() {
  return (
    <NotificationProvider>
      <Provider store={store}>
        <MainStack />
      </Provider>
    </NotificationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
