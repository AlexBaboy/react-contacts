import { Contacts } from "./pages/Contacts";
import { Provider } from "react-redux";
import store from "./reduxToolkit";

export function App() {
  return (
    <Provider store={store}>
      <Contacts />
    </Provider>
  );
}
