import "sanitize.css";
import "antd/dist/antd.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import { StoreContext } from "redux-react-hook";
import RootSaga from "./Sagas";
import RootReducer from "./Reducers";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const ENV = process.env.NODE_ENV;
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();

if (ENV === "development") {
  const DEV_TOOLS_EXTENSION = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof DEV_TOOLS_EXTENSION === "function")
    enhancers.push(DEV_TOOLS_EXTENSION());
}

const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    ...enhancers
  )
);

sagaMiddleware.run(RootSaga);

const render = Render =>
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <Render />
    </StoreContext.Provider>,
    document.getElementById("root")
  );

render(App);

if (module.hot)
  module.hot.accept("./App", () => {
    const Next = require("./App").default;
    render(Next);
  });

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
