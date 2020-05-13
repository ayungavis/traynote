import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { useGlobalStyles } from "hooks/styles";
import { useAuthContext } from "hooks/contexts/AuthContext";
import { loginWithGoogle } from "api/auth";

import Content from "components/Content";
import Button from "components/Button";

const HomePage = () => {
  const classes = useStyles();
  const global = useGlobalStyles();
  const history = useHistory();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (auth.isLoggedIn) {
      history.push("/dashboard");
    } else {
      loginWithGoogle()
        .then(() => {
          setLoading(false);
          history.push("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <Content>
      <Grid container spacing={3} className={`${classes.hero} ${global.mt30}`}>
        <Grid item xs={12} sm={7} className={classes.heroLeft}>
          <Typography variant="h4" className={classes.title}>
            Take notes anywhere and faster.
          </Typography>
        </Grid>
        <Grid item sm={5} className={classes.heroRight}>
          <img
            src="assets/home/hero.svg"
            alt="hero"
            className={classes.image}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={`${global.mt50}`}>
        <Grid item sm={5} className={classes.heroMiniLeft}>
          <Typography variant="h5" className={global.bold}>
            Save important notes easily!
          </Typography>
          <Typography variant="subtitle1">
            Traynote helps you to capture ideas and inspuiration in notes,
            voice, and pictures. Keep it private with your accunt!
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            loading={loading}
            onClick={handleClick}
          >
            CREATE MY NOTE
          </Button>
        </Grid>
        <Grid item sm={7} className={classes.heroMiniRight}>
          <img src="assets/home/hero-mini-2.svg" alt="hero-mini-2" />
          <img src="assets/home/hero-mini-1.svg" alt="hero-mini-1" />
          <img src="assets/home/hero-mini-3.svg" alt="hero-mini-3" />
        </Grid>
      </Grid>
    </Content>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    height: "400px",
    borderRadius: "10px",
    backgroundColor: "#BCB4E5",
  },
  heroLeft: {
    paddingTop: "4rem !important",
    paddingLeft: "4rem !important",
    paddingRight: "12.5rem !important",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2rem",
      paddingLeft: "2rem",
      paddingRight: "4rem",
    },
  },
  heroRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "2.813rem",
    fontWeight: 500,
  },
  image: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "8rem",
    },
  },
  heroMiniLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heroMiniRight: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    width: "fit-content",
  },
}));

export default HomePage;
