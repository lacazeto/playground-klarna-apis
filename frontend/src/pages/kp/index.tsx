import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useScript } from "../../utils/hooks";
import Checkout from "./Checkout";
import Payments from "./Payments";
import NotFound from "../notFound";

// import PurchaseSuccess from "./purchaseSuccess";

export default function KPIndex(): React.ReactElement {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/kp">
            <Payments />
          </Route>
          <Route exact path="/kp/checkout">
            <Checkout />
          </Route>
          <Route path="/kp/order/:order_id/confirmed">{/* <PurchaseSuccess /> */}</Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      {useScript("https://x.klarnacdn.net/kp/lib/v1/api.js")}
    </>
  );
}
