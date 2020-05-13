import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IoMdSave } from "react-icons/io";

import { updateNote } from "api/notes";
import { useAuthContext } from "hooks/contexts/AuthContext";
import { useGlobalStyles } from "hooks/styles";
import { Note } from "types/model";

import Button from "./Button";

interface Props {
  onSuccess: (value: boolean) => void;
  onCancel: (value: boolean) => void;
  note: Note;
}

const EditNote = ({ onSuccess, onCancel, note }: Props) => {
  const classes = useStyles();
  const global = useGlobalStyles();
  const auth = useAuthContext();
  const [title, setTitle] = useState<string>(note.title);
  const [description, setDescription] = useState<string>(note.description);
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleUpdate = async () => {
    if (title && description && note.uid) {
      const userId = auth.firebaseUser!.uid;
      const noteId = note!.uid;
      setLoading(true);
      try {
        await updateNote(userId, noteId, title, description);
        setLoading(false);
        onSuccess(true);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    onCancel(true);
  };

  return (
    <div className={classes.box}>
      <Grid container className={global.mb20}>
        <Grid item sm={12}>
          <InputBase
            autoFocus
            fullWidth
            value={title}
            placeholder="Title here..."
            onChange={handleTitleChange}
          />
        </Grid>
      </Grid>
      <Grid className={global.mb20}>
        <InputBase
          fullWidth
          multiline
          value={description}
          placeholder="Description here..."
          onChange={handleDescriptionChange}
        />
      </Grid>
      <Grid container className={`${classes.row}`}>
        <Grid item xs={12} className={`${global.floatRight}`}>
          <Button
            variant="text"
            className={classes.mr30}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<IoMdSave />}
            loading={loading}
            disabled={!title && !description ? true : false}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    padding: "1.5rem",
    marginBottom: theme.spacing(4),
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
  },
  row: {
    alignItems: "center",
  },
  mr30: {
    marginRight: theme.spacing(3),
  },
}));

export default EditNote;
