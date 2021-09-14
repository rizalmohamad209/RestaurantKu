import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import { listen } from "./app/listener";
import { getCart } from "./api/cart";
import Signup from "./pages/Signup";
import SignupSukses from "./pages/SignupSukses";
import Signin from "./pages/Signin";
import addAddress from "./pages/AddAddress";

import { Provider } from "react-redux";
import store from "./app/store";
import UserAddress from "./pages/UserAddress";
import Checkout from "./pages/Checkout";

function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signup/sukses" exact component={SignupSukses} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/address/addAddress" exact component={addAddress} />
          <Route path="/address" exact component={UserAddress} />
          <Route path="/checkout" exact component={Checkout} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
