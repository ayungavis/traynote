import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const Loading = () => {
  const classes = useStyles();

  return <div className={classes.root}></div>;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

export default Loading;
