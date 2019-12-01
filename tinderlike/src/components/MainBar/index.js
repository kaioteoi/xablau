import React, {useState, useEffect} from "react";
import {withRouter, useHistory} from 'react-router-dom';

import {makeStyles} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PATHS from 'components/constants';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const TEXTS = {
    ONBOARDING: 'Encontrar meu imóvel',
    MATCHER: 'Recomendados pra mim',
    LIKES: 'Os que mais gostei'
};

const LOCATION_MAP = {
    '/': TEXTS.ONBOARDING,
    '/matcher': TEXTS.MATCHER,
    '/likes': TEXTS.LIKES
};

function MainBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        console.log(history);
        setSelectedMenu(LOCATION_MAP[history.location.pathname]);
        // eslint-disable-next-line
    }, [history.location.pathname]);

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={() => setDrawerOpen(false)}
        >
            <List>
                <ListItem
                    button key={TEXTS.ONBOARDING}
                    onClick={() => history.push(PATHS.ONBOARDING)}
                    selected={selectedMenu === TEXTS.ONBOARDING}
                >
                    <ListItemText primary={TEXTS.ONBOARDING} />
                </ListItem>
                <ListItem
                    button key={TEXTS.MATCHER}
                    onClick={() => history.push(PATHS.MATCHER)}
                    selected={selectedMenu === TEXTS.MATCHER}
                >
                    <ListItemText primary={TEXTS.MATCHER} />
                </ListItem>
                <ListItem
                    button key={TEXTS.LIKES}
                    onClick={() => history.push(PATHS.LIKES)}
                    selected={selectedMenu === TEXTS.LIKES}
                >
                    <ListItemText primary={TEXTS.LIKES} />
                </ListItem>
            </List>
        </div>
    );


    return (
        <React.Fragment>
            <AppBar position="relative" color="default">
                <Toolbar>
                    <IconButton edge="start" color="primary" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}>
                {sideList('left')}
            </SwipeableDrawer>

        </React.Fragment>
    )
};

export default withRouter(MainBar);