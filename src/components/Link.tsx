import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  to: string;
}

const Link: React.FC<Props> = props => {
  const { children, to } = props;
  const classes = useStyles();

  return (
    <RouterLink className={classes.root} to={to}>
      {children}
    </RouterLink>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    textDecoration: "none",
    cursor: "pointer"
  }
}));

export default Link;
