import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Toolbar,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default function NavBar() {
  const [navBarState, setNavBarState] = useState(false);

  return (
    <div>
      <Box component="nav" elevation={0}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h5" style={{ flexGrow: 1 }}>
              JobChance
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                setNavBarState(!navBarState);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      {navBarState && (
        <List dense={true} component="nav" aria-label="main mailbox folders" style={{ padding: 20 }}>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/",
            }}
            onClick={() => {
                setNavBarState(!navBarState);
            }}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/about",
            }}
            onClick={() => {
                setNavBarState(!navBarState);
            }}
          >
            <ListItemText primary="About" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/addcompany",
            }}
            onClick={() => {
                setNavBarState(!navBarState);
            }}
          >
            <ListItemText primary="Add a Company" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/addjob",
            }}
            onClick={() => {
                setNavBarState(!navBarState);
            }}
          >
            <ListItemText primary="Add a Job" />
          </ListItem>
        </List>
      )}
    </div>
  );
}
