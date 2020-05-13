import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Navbar from "./Navbar";

interface Props {}

const Content: React.FC<Props> = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.container}>{children}</div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "1140px",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      marginRight: "2rem",
      marginLeft: "2rem",
    },
  },
  container: {
    margin: "16px 0px",
  },
}));

export default Content;
