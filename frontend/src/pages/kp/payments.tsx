import React, { FormEvent, useState } from "react";
import { Box, Typography, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSession } from "../../utils/apis";
import KlarnaButton from "../../components/KlarnaButton";
import { PaymentMethods } from "@cs/training-be/src/types/klarnaPayments";

const useStyles = makeStyles(() => ({
  box: {
    padding: "5px",
    width: "35%",
    minWidth: "500px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "5px 0",
    backgroundColor: "white",
  },
  apiResponse: {
    marginLeft: "10px",
    width: "100%",
  },
  list: {
    padding: "5px",
  },
  h5: {
    overflowX: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    backgroundColor: "yellow"
  },
}));

export default function Payments(): React.ReactElement {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [payments, setPayments] = useState<PaymentMethods>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [clientToken, setclientToken] = useState<string>("");

  const classes = useStyles();

  const submitAction = async (event: FormEvent) => {
    event.preventDefault();
    const session = await getSession(credentials);

    if (session) {
      setPayments(session.payment_method_categories);
      setSessionId(session.session_id);
      setclientToken(session.client_token);
    }
  };

  const parsePaymentsNames = (payments: PaymentMethods) => {
    const paymentIdentifiers = payments.map((payment) => payment.identifier.replaceAll(/_/g, " ").toUpperCase());

    return (
      <Box pl={2}>
        {paymentIdentifiers.map((paymentIdentifier) => (
          <li className={classes.list} key={paymentIdentifier}>
            {paymentIdentifier}
          </li>
        ))}
      </Box>
    );
  };

  const SidePanel = (): React.ReactElement => {
    return (
      <Box className={classes.box} p={3}>
        <strong>
          <i>Session Values:</i>
        </strong>
        <h5 className={classes.h5}><i>Session ID: {sessionId}</i></h5>
        <h5 className={classes.h5}><i>Client Token: {clientToken}</i></h5>
      </Box>
    );
  };

  return (
    <Box display="flex" justifyContent="space-between">
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
        <Box mt={5} mb={5} display="flex">
          <small>Click Submit to list all available Payments for this MID in Germany: </small>
          <Paper elevation={0} variant="outlined" className={classes.apiResponse}>
            {parsePaymentsNames(payments)}
          </Paper>
        </Box>
      </Box>
      {SidePanel()}
    </Box>
  );
}
