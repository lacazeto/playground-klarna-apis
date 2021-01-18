import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Checkout from "./checkout";
import Payments from "./Payments";
import NotFound from "../notFound";

// import PurchaseSuccess from "./purchaseSuccess";

export default function KPIndex(): React.ReactElement {
  return (
    <Router>
      <Switch>
        <Route exact path="/kp">
          <Payments />
        </Route>
        <Route exact path="/kp/order">
          {/* <Checkout /> */}
        </Route>
        <Route path="/kp/order/:order_id/confirmed">{/* <PurchaseSuccess /> */}</Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
