import MainStack from "./utils/navigate";
import { Provider } from "react-redux";
import { NotificationProvider } from "./context/NotificationContext";
import store from "./store/store";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <Provider store={store}>
        <MainStack />
      </Provider>
    </NotificationProvider>
  );
};

export default App;
