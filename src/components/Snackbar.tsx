import React, { useState } from "react";
import {
  default as MaterialSnackbar,
  SnackbarOrigin,
} from "@material-ui/core/Snackbar";

import Alert, { Color } from "./Alert";

interface Props {
  open: boolean;
  anchorOrigin?: SnackbarOrigin;
  duration?: number;
  className?: string;
  key?: any;
  severity?: Color;
}

const Snackbar: React.FC<Props> = (props) => {
  const {
    children,
    open,
    anchorOrigin,
    duration,
    className,
    key,
    severity,
  } = props;

  const [isOpen, setIsOpen] = useState(open);
  return (
    <MaterialSnackbar
      open={isOpen}
      key={key}
      autoHideDuration={duration}
      className={className}
      anchorOrigin={
        anchorOrigin
          ? anchorOrigin
          : { horizontal: "right", vertical: "bottom" }
      }
    >
      <Alert severity={severity ? severity : "info"}>{children}</Alert>
    </MaterialSnackbar>
  );
};

export default Snackbar;
