import React, {useState} from "react";

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";

function MainBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

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
                onOpen={() => setDrawerOpen(true)}
            />
        </React.Fragment>
    )
};

export default MainBar;