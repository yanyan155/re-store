import React from "react";
import { Route, Switch } from "react-router-dom";
import ShopHeader from "../shop-header";
import { HomePage, CartPage } from "../pages";
import { ShoppingCart } from "../../types";
import { connect } from "react-redux";

import "./app.css";

interface IProps {
  numItems: number;
  total: number;
}

const App = ({ numItems, total }: IProps) => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={numItems} total={total} />
      <Switch>
        <Route path="/" component={HomePage} exact />

        <Route path="/cart" component={CartPage} />
      </Switch>
    </main>
  );
};

interface MapStateToProps {
  shoppingCart: ShoppingCart;
}

const mapStateToProps = ({
  shoppingCart: { cartItems, orderTotal },
}: MapStateToProps) => {
  return {
    numItems: cartItems.map((el) => el.count).reduce((a, b) => a + b, 0),
    total: orderTotal,
  };
};

export default connect(mapStateToProps)(App);
