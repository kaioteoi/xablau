import React from 'react';

import {ThemeProvider} from "@material-ui/styles";
import {makeStyles} from "@material-ui/core";

import theme from '../theme/main';
import Onboarding from './Onboarding';
import Matcher from './Matcher';
import Likes from './Likes';
import MainBar from './MainBar';
import '../App.css';

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
            width: 700,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
}));

export default function App() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <MainBar/>
            <main className={classes.layout}>
                <Router>
                    <Switch>
                        <Route path="/likes" render={() => <Likes/>}/>
                        <Route path="/matcher" render={() => <Matcher/>}/>
                        <Route path="/" render={() => <Onboarding/>}/>
                    </Switch>
                </Router>
            </main>
        < /ThemeProvider>
    );
};
