import { Contacts } from "./pages/Contacts";
import { Provider } from "react-redux";
import store from "./store";
import React from "react";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Contacts />
    </Provider>
  );
};
