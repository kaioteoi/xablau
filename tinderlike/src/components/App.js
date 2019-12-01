import React from 'react';
import { ThemeProvider } from "@material-ui/styles";

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


export default function App() {
    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
}
