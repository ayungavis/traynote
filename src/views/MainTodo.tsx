import React from "react";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Content from "../components/Content";

const MainTodo = () => {
  const classes = useStyles();

  return (
    <Content>
      <Paper component="form" className={classes.form}>
        <InputBase
          className={classes.input}
          placeholder="Type something..."
          inputProps={{ "aria-label": "Add task" }}
        />
      </Paper>
    </Content>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    padding: "2px 4px",
    display: "flex",
    height: "46px",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px"
  },
  input: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "100%"
  }
}));

export default MainTodo;
