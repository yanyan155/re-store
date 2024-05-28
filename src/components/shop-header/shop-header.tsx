import React from "react";
import "./shop-header.css";
import { Link } from "react-router-dom";

interface Iprops {
  numItems: any;
  total: any;
}

const ShopHeader = ({ numItems, total }: Iprops) => {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">ReStore</div>
      </Link>
      <Link to="/cart">
        <div className="shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {numItems} items (${total})
        </div>
      </Link>
    </header>
  );
};

export default ShopHeader;
