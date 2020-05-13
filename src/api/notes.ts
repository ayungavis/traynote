import { db, firebase } from "services/firebase";
import { Note } from "types/model";

export function addNote(userId: string, title: string, description: string) {
  const noteId = db.ref(`notes/${userId}`).push().key;

  return db.ref(`notes/${userId}/${noteId}`).set({
    uid: noteId,
    title,
    description,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  });
}

export function updateNote(
  userId: string,
  noteId: string,
  title: string,
  description: string
) {
  return db.ref(`notes/${userId}/${noteId}`).set({
    title,
    description,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
  });
}

export function removeNote(userId: string, noteId: string) {
  return db.ref(`notes/${userId}/${noteId}`).remove();
}

export const getNote = async (userId: string): Promise<Note> => {
  const snap = await db.ref(`notes/${userId}`).once("value");
  return snap.val();
};
