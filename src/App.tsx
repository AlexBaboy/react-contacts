import { Contacts } from "./pages/Contacts";
import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {Info} from "./pages/Info";
import {About} from "./pages/About";

export const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <Contacts />
            <Switch>
                <Route component={Contacts} path="/" />
                <Route component={Info} path="/info" />
                <Route component={About} path="/about" />
            </Switch>
        </Provider>
      </BrowserRouter>
  );
};
