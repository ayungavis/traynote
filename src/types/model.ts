/* tslint:disable */
/** Autmatically generated. Execute `npm run make-schemas` to regenerate **/

// -----------------------------------------------

export interface Note {
  uid?: string;
  title: string;
  description: string;
  favorite?: boolean;
  createdAt: string;
  updatedAt?: string;
}
// -----------------------------------------------

export interface User {
  fullName: string;
  email?: string;
  emailVerified?: string;
  phoneNumber?: string;
  photo?: string;
}
