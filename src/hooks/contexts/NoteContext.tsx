import React, { createContext, useContext } from "react";
import { Note } from "types/model";

export interface NoteContextInterface {
  notes: Note[] | null;
}

export const NoteContext = createContext<NoteContextInterface>({
  notes: [],
});

export const useNoteContext = () => useContext(NoteContext);

export const withNoteContext = <P extends object>(
  Component: React.ComponentType<P>
) => {
  class WithNoteContext extends React.Component<P & NoteContextInterface> {
    render() {
      return (
        <NoteContext.Consumer>
          {(noteContext) => <Component {...this.props} {...noteContext} />}
        </NoteContext.Consumer>
      );
    }
  }
};

export default NoteContext;
