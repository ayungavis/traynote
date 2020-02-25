import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import MainTodo from "./views/MainTodo";
import AddTodo from "./views/AddTodo";
import DetailTodo from "./views/DetailTodo";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainTodo} />
        <Route exact path="/add" component={AddTodo} />
        <Route exact path="/view/:id" component={DetailTodo} />
      </Switch>
    </Router>
  );
}

export default App;
