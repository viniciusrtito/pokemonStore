import React from "react";
//instalar react-router-dom via npm
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MarketPlace from "./pages/marketplace";
import CartShopping from "./pages/cartShopping";

/** usando o exact a rota deve ser exatamente igual */
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MarketPlace} />
        <Route path="/cartShopping" component={CartShopping} />
      </Switch>
    </BrowserRouter>
  );
}
