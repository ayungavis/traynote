import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import { default as MaterialAlert } from "@material-ui/lab/Alert";
import { default as MaterialAlertTitle } from "@material-ui/lab/AlertTitle";
import { makeStyles } from "@material-ui/core/styles";

export type Color = "error" | "info" | "success" | "warning";
type Variant = "filled" | "outlined" | "standard";

interface Props {
  action?: React.ReactNode;
  className?: string;
  closeText?: string;
  color?: Color;
  icon?: React.ReactNode;
  iconMapping?: {
    error?: React.ReactNode;
    info?: React.ReactNode;
    success?: React.ReactNode;
    warning?: React.ReactNode;
  };
  role?: string;
  severity?: Color;
  variant?: Variant;
  title?: string;
}

const Alert: React.FC<Props> = (props) => {
  const {
    children,
    action,
    className,
    closeText,
    color,
    icon,
    iconMapping,
    role,
    severity,
    variant,
    title,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  return (
    <Collapse in={open}>
      <MaterialAlert
        className={`${classes.root} ${className && className}`}
        severity={severity}
        variant={variant}
        role={role}
        color={color}
        action={action && action}
        icon={icon}
        closeText={closeText}
        onClose={() => setOpen(false)}
        iconMapping={iconMapping}
      >
        {title && <MaterialAlertTitle>{title}</MaterialAlertTitle>}
        {children}
      </MaterialAlert>
    </Collapse>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex!important",
    flexDirection: "row !important" as "row",
    alignItems: "center!important",
  },
}));

export default Alert;
