import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import KPIndex from "./pages/kp/index";
import Copyright from "./components/Copyright";
import NotFound from "./pages/notFound";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative",
  },
  main: {
    marginBottom: "120px",
    padding: "10px",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    position: "fixed",
    width: "100%",
    bottom: 0,
  },
}));

function App(): React.ReactElement {
  const classes = useStyles();

  return (
    <div className="App">
      <AppBar className={classes.header}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Custom Solutions Playground
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <main className={classes.main}>
          <Switch>
            <Route exact path="/"></Route>
            <Route path="/kp">
              <KPIndex />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>

      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          A very nice footer to charm your eyes!
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
}

export default App;
