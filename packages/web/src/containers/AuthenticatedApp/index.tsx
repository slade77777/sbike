import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../../components/Header';
// import Content from './Content';
import Footer from '../../components/Footer';
// import {useAuthState} from '../../context/auth-context';
import Content from './Content';

const AuthenticatedApp = () => {
  return (
    <BrowserRouter>
      <>
        <Header username="hello" />
        <Switch>
          <Route path="/second" exact>
            <div>Second</div>
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
