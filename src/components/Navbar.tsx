import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  IoLogoGoogle,
  IoIosPerson,
  IoMdLogOut,
  IoMdHome,
} from "react-icons/io";

import { useAuthContext } from "hooks/contexts/AuthContext";
import { loginWithGoogle, logout } from "api/auth";

import Link from "./Link";
import Button from "./Button";

const Navbar = () => {
  const classes = useStyles();
  const auth = useAuthContext();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSignUp = () => {
    setLoading(true);
    loginWithGoogle()
      .then(() => {
        setLoading(false);
        history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    history.push("/");
  };

  const handleMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderAvatar() {
    if (auth.user?.photo)
      return (
        <div className={classes.avatar} onClick={handleMenu}>
          <Avatar alt={auth.user?.fullName} src={auth.user?.photo} />
        </div>
      );
    else
      return (
        <div className={classes.avatar} onClick={handleMenu}>
          <Avatar>
            <IoIosPerson />
          </Avatar>
        </div>
      );
  }

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={9}>
        <Link to="/">
          <Typography variant="h1" className={classes.logo}>
            Traynote
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={3} className={classes.row}>
        {auth.isLoggedIn ? (
          renderAvatar()
        ) : (
          <Button
            onClick={handleSignUp}
            startIcon={<IoLogoGoogle />}
            variant="contained"
            loading={loading}
          >
            Sign Up
          </Button>
        )}
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem>
          <Link to="/dashboard">
            <ListItemIcon>
              <IoMdHome />
            </ListItemIcon>
            <Typography variant="inherit">Dashboard</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IoIosPerson />
          </ListItemIcon>
          <Typography variant="inherit">Profile</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <IoMdLogOut />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "80px",
  },
  logo: {
    fontSize: "1.5rem",
    margin: "0px",
    letterSpacing: "5px",
    textTransform: "uppercase",
  },
  avatar: {
    cursor: "pointer",
  },
  row: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default Navbar;
