import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Auth, Dashboard } from './containers';

const App = () => {
  let routes = (
    <Switch>
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/' component={Auth} />
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
