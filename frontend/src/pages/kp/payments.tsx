import React, { FormEvent } from "react";
import { Box, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import KlarnaButton from "../../components/KlarnaButton";

const useStyles = makeStyles(() => ({
  box: {
    padding: "5px",
  },
  form: {
    display: "flex",
    width: "35%",
    minWidth: "120px",
    flexDirection: "column",
  },
  input: {
    margin: "5px 0",
    backgroundColor: "white",
  },
}));

export default function Payments(): React.ReactElement {
  const classes = useStyles();

  const submitAction = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("/kp/session")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className={classes.box}>
      <Typography> MID: PK23073</Typography>
      <form onSubmit={submitAction} className={classes.form} noValidate autoComplete="off">
        <TextField className={classes.input} label="Merchant Username" variant="outlined" />
        <TextField className={classes.input} label="Merchant Password" variant="outlined" />
        <KlarnaButton>Submit</KlarnaButton>
      </form>
    </Box>
  );
}
