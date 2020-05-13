import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IoMdSave } from "react-icons/io";

import { addNote } from "api/notes";
import { useAuthContext } from "hooks/contexts/AuthContext";
import { useGlobalStyles } from "hooks/styles";

import Button from "./Button";

interface Props {
  onSuccess: (value: boolean) => void;
  onCancel: (value: boolean) => void;
}

const AddNote = ({ onSuccess, onCancel }: Props) => {
  const classes = useStyles();
  const global = useGlobalStyles();
  const auth = useAuthContext();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSave = async () => {
    if (title && description) {
      const userId = auth.firebaseUser!.uid;
      setLoading(true);
      try {
        await addNote(userId, title, description);
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
            placeholder="Title here..."
            onChange={handleTitleChange}
          />
        </Grid>
      </Grid>
      <Grid className={global.mb20}>
        <InputBase
          fullWidth
          multiline
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
            onClick={handleSave}
          >
            Save
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

export default AddNote;
