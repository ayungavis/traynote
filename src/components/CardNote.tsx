import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import dayjs from "dayjs";

import { useAuthContext } from "hooks/contexts/AuthContext";
import { useGlobalStyles } from "hooks/styles";
import { removeNote } from "api/notes";
import { Note } from "types/model";

import EditNote from "./EditNote";

interface Props {
  note: Note;
}

const CardNote = ({ note }: Props) => {
  const classes = useStyles();
  const global = useGlobalStyles();
  const auth = useAuthContext();
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = async () => {
    if (note && note.uid) {
      const userId = auth.firebaseUser!.uid;
      const noteId = note.uid;
      try {
        await removeNote(userId, noteId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSuccess = (value: boolean) => {
    setEdit(!value);
  };

  const handleCancel = (value: boolean) => {
    setEdit(!value);
  };

  const { title, description, createdAt } = note;
  if (edit) {
    return (
      <EditNote onSuccess={handleSuccess} onCancel={handleCancel} note={note} />
    );
  } else {
    return (
      <div className={classes.box}>
        <Grid container className={global.mb20}>
          <Grid item sm={12}>
            <Typography variant="h6">{title}</Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" className={global.mb20}>
          {description}
        </Typography>
        <Grid container className={`${classes.row}`}>
          <Grid item xs={12} sm={6}>
            <IconButton onClick={handleEdit}>
              <IoMdCreate />
            </IconButton>
            {/* <IconButton>
            <IoMdShare />
          </IconButton>
          <IconButton>
            <IoMdStarOutline />
          </IconButton> */}
            <IconButton onClick={handleDelete}>
              <IoIosTrash />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={6} className={`${global.floatRight}`}>
            {note.updatedAt ? (
              <Typography variant="body2">
                Last edited{" "}
                {dayjs(note.updatedAt).format("MMMM D, YYYY h:mm A")}
              </Typography>
            ) : (
              <Typography variant="body2">
                Created at {dayjs(createdAt).format("MMMM D, YYYY h:mm A")}
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
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
}));

export default CardNote;
