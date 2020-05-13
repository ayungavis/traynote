import React from "react";
import { default as MaterialButton } from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ReactLoading from "react-loading";

type Color = "default" | "inherit" | "primary" | "secondary";
type Size = "small" | "medium" | "large";
type Variant = "text" | "outlined" | "contained";

interface Props {
  className?: string;
  color?: Color;
  component?: React.ElementType;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  size?: Size;
  variant?: Variant;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = (props) => {
  const {
    children,
    className,
    color,
    component,
    disabled,
    startIcon,
    endIcon,
    fullWidth,
    href,
    size,
    variant,
    loading,
    onClick,
  } = props;

  function getHeight() {
    switch (size) {
      case "small":
        return "32px";
      case "medium":
        return "38px";
      case "large":
        return "46px";
      default:
        return "38px";
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    return onClick ? onClick(event) : false;
  };

  const classes = useStyles();

  return (
    <MaterialButton
      className={`${classes.root} ${className ? className : null}`}
      style={{ height: getHeight() }}
      color={color ? color : "primary"}
      component={component ? component : "button"}
      disabled={disabled || loading}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      href={href}
      variant={variant}
      onClick={handleClick}
      disableElevation
    >
      {loading ? (
        <ReactLoading
          className={classes.loading}
          type="bubbles"
          color="#5843BD"
          height={30}
        />
      ) : (
        <Typography variant="button">{children}</Typography>
      )}
    </MaterialButton>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  loading: {
    marginTop: "-35px",
  },
}));

export default Button;
