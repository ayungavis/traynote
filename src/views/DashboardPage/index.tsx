import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { useGlobalStyles } from "hooks/styles";
import { useNoteContext } from "hooks/contexts/NoteContext";
import { Note } from "types/model";

import Content from "components/Content";
import CardNote from "components/CardNote";
import AddNote from "components/AddNote";

const DashboardPage = () => {
  const classes = useStyles();
  const global = useGlobalStyles();
  const notes = useNoteContext();
  const [add, setAdd] = useState(false);

  const handleSuccess = (value: boolean) => {
    setAdd(!value);
  };

  const handleCancel = (value: boolean) => {
    setAdd(!value);
  };

  const handleAdd = () => {
    setAdd(true);
  };

  function renderNotes() {
    if (notes.notes) {
      return notes.notes.map((note: Note, index: number) => (
        <CardNote key={index} note={note} />
      ));
    } else {
      if (!add)
        return (
          <Typography variant="body1">
            You didn't create any note yet.
          </Typography>
        );
    }
  }

  return (
    <Content>
      <Grid container spacing={3} className={`${global.mt30}`}>
        <Grid item xs={12} sm={3}>
          <img
            src="assets/dashboard/button-create.svg"
            alt="button-create"
            className={`${classes.button} ${global.mb20}`}
            onClick={handleAdd}
          />
          <Typography variant="subtitle1" className={classes.subtitle}>
            Traynote makes it easy for you to save your important notes whenever
            and wherever you are. All your notes are stored securely in your
            account.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          {add && <AddNote onSuccess={handleSuccess} onCancel={handleCancel} />}
          {renderNotes()}
        </Grid>
      </Grid>
    </Content>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  subtitle: {
    paddingRight: "1rem",
  },
  button: {
    cursor: "pointer",
  },
  box: {
    padding: "1.5rem",
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
  },
  row: {
    alignItems: "center",
  },
}));

export default DashboardPage;
