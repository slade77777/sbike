import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Second from './pages/Second';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/second" exact>
          <Second />
        </Route>

        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
