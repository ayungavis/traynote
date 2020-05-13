import { db, auth, googleProvider } from "services/firebase";

export function signupWithEmailAndPassword(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<any> {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) =>
      db.ref(`users/${user!.uid}/profile`).update({ firstName, lastName })
    );
}

export function loginWithEmailAndPassword(
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

export async function loginWithGoogle(): Promise<firebase.auth.UserCredential> {
  const result = await auth.signInWithPopup(googleProvider);
  if (
    result.user &&
    result.additionalUserInfo &&
    result.additionalUserInfo.isNewUser
  ) {
    const { user } = result;
    await db.ref(`users/${user!.uid}`).update({
      fullName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      photo: user.photoURL,
    });
  }
  return result;
}

export function sendPasswordResetEmail(email: string): Promise<void> {
  return auth.sendPasswordResetEmail(email);
}

export function logout(): Promise<void> {
  return auth.signOut();
}
