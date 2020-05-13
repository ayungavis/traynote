import Ajv from "ajv";

import userSchema from "schemas/user.json";
import noteSchema from "schemas/note.json";

const ajv = new Ajv({ useDefaults: true });

export const validateUser = ajv.compile(userSchema);
export const validateNote = ajv.compile(noteSchema);
