import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import { AuthContext } from "hooks/contexts/AuthContext";
import { NoteContext } from "hooks/contexts/NoteContext";
import { auth, db } from "services/firebase";
import { User, Note } from "types/model";
import { validateUser, validateNote } from "types/validator";

import { PrivateRoute } from "router";

import Loading from "components/Loading";
import theme from "config/theme";

const HomePage = lazy(() => import("views/HomePage"));
const DashboardPage = lazy(() => import("views/DashboardPage"));

const App: React.FC = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [userObjectRef, setUserObjectRef] = useState<any>(null);
  const [noteObjectRef, setNoteObjectRef] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      const isLoggedIn = !!firebaseUser;
      setIsAuthReady(true);
      setIsLoggedIn(isLoggedIn);
      setFirebaseUser(firebaseUser);

      if (isLoggedIn) {
        if (!userObjectRef) {
          const userRef = db.ref(`/users/${firebaseUser!.uid}`);
          setUserObjectRef(userRef);

          userRef.on("value", (snap) => {
            validateUser(snap!.val());
            setUser((snap!.val() as unknown) as User);
          });
        }

        if (!noteObjectRef) {
          const noteObjectRef = db.ref(`/notes/${firebaseUser!.uid}`);
          setNoteObjectRef(noteObjectRef);
          noteObjectRef
            .orderByChild("createdAt")
            .on("value", async (snap: any) => {
              validateNote(Object.values(snap!.val()));
              if (snap.val()) {
                setNotes(Object.values(snap!.val()));
              } else {
                setNotes([]);
              }
            });
        }
      } else {
        if (userObjectRef) {
          userObjectRef!.off();
          setUserObjectRef(null);
        }

        if (noteObjectRef) {
          noteObjectRef!.off();
          setNoteObjectRef(null);
        }
      }

      localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    });
  });

  return (
    <AuthContext.Provider
      value={{ isAuthReady, isLoggedIn, firebaseUser, user }}
    >
      <NoteContext.Provider value={{ notes }}>
        <ThemeProvider theme={theme}>
          <Router>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={DashboardPage}
                />
              </Switch>
            </Suspense>
          </Router>
        </ThemeProvider>
      </NoteContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
