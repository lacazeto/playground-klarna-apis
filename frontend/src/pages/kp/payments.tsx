import React, { FormEvent, useState } from "react";
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
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const classes = useStyles();

  const submitAction = (event: FormEvent) => {
    console.log(credentials);
    event.preventDefault();
    axios
      .post("/kp/session", credentials && { credentials })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className={classes.box}>
      <Typography> Enter Your Klarna Credentials</Typography>
      <form onSubmit={submitAction} className={classes.form} noValidate autoComplete="off">
        <TextField
          className={classes.input}
          type="string"
          name="username"
          label="Merchant Username"
          variant="outlined"
          onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
        />
        <TextField
          className={classes.input}
          type="string"
          name="password"
          label="Merchant Password"
          variant="outlined"
          onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
        />
        <KlarnaButton>Submit</KlarnaButton>
      </form>
    </Box>
  );
}
