import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import {makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import '../App.css';
import theme from '../theme/main';
import Onboarding from './Onboarding';
import Matcher from './Matcher';
import Likes from './Likes';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative"
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(1) * 2,
        marginRight: theme.spacing(1) * 2,
        marginTop: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(1) * 2 * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
}))

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
        <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    Deu match!
                </Typography>
            </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Router>
              <Switch>
                  <Route path="/likes">
                      <Likes />
                  </Route>
                  <Route path="/matcher">
                      <Matcher/>
                  </Route>
                  <Route path="/">
                      <Onboarding/>
                  </Route>
              </Switch>
          </Router>
        </main>
    </ThemeProvider>
  );
}
