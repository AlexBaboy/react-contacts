import { Contacts } from "./pages/Contacts";
import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {Info} from "./pages/Info";
import {About} from "./pages/About";
import {NavBar} from "./components/NavBar";

export const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Switch>
            <Provider store={store}>
                <NavBar />
                <Route component={Contacts} path='/' />
                <Route component={Info} path='/info' />
                <Route component={About} path='/about' />
            </Provider>
          </Switch>
      </BrowserRouter>
  );
};
