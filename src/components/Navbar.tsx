import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";

import Link from "./Link";
import Button from "./Button";

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleAdd = () => {
    history.push("/add");
  };

  const handleSave = () => {};

  const handleCancel = () => {
    history.goBack();
  };

  const { pathname } = location;
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={9}>
        <Link to="/">
          <h1 className={classes.logo}>ToDo App</h1>
        </Link>
      </Grid>
      <Grid item xs={3}>
        {pathname === "/add" ? (
          <div className={classes.row}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        ) : (
          <Button onClick={handleAdd}>Add Task</Button>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "64px"
  },
  logo: {
    fontSize: "1.5rem",
    margin: "0px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export default Navbar;
