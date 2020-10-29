import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Account from '../Account';
import Content from './Content';

const AuthenticatedApp = () => {
  return (
    <BrowserRouter>
      <>
        <Header username="hello" />
        <Switch>
          <Route path="/second" exact>
            <Account />
          </Route>

          <Route path="/" exact>
            <Content />
          </Route>
        </Switch>
        <Footer />
      </>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;
