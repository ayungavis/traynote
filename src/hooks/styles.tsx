import { makeStyles, Theme } from "@material-ui/core/styles";

export const useGlobalStyles = makeStyles((theme: Theme) => ({
  mb0: {
    marginBottom: theme.spacing(0),
  },
  mb10: {
    marginBottom: theme.spacing(1),
  },
  mb20: {
    marginBottom: theme.spacing(2),
  },
  mb30: {
    marginBottom: theme.spacing(3),
  },
  mb40: {
    marginBottom: theme.spacing(4),
  },
  mb50: {
    marginBottom: theme.spacing(5),
  },
  mt0: {
    marginTop: theme.spacing(0),
  },
  mt10: {
    marginTop: theme.spacing(1),
  },
  mt20: {
    marginTop: theme.spacing(2),
  },
  mt30: {
    marginTop: theme.spacing(3),
  },
  mt40: {
    marginTop: theme.spacing(4),
  },
  mt50: {
    marginTop: theme.spacing(5),
  },
  pb0: {
    paddingBottom: theme.spacing(0),
  },
  pb10: {
    paddingBottom: theme.spacing(1),
  },
  pb20: {
    paddingBottom: theme.spacing(2),
  },
  pb30: {
    paddingBottom: theme.spacing(3),
  },
  pb40: {
    paddingBottom: theme.spacing(4),
  },
  pb50: {
    paddingBottom: theme.spacing(5),
  },
  pt0: {
    paddingTop: theme.spacing(0),
  },
  pt10: {
    paddingTop: theme.spacing(1),
  },
  pt20: {
    paddingTop: theme.spacing(2),
  },
  pt30: {
    paddingTop: theme.spacing(3),
  },
  pt40: {
    paddingTop: theme.spacing(4),
  },
  pt50: {
    paddingTop: theme.spacing(5),
  },
  floatRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  bold: {
    fontWeight: "bold",
  },
}));
