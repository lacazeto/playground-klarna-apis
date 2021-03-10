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
    width: "100%"
  },
  list: {
    padding: "5px"
  }
}));

export default function Payments(): React.ReactElement {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [payments, setPayments] = useState<PaymentMethods>();

  const classes = useStyles();

  const submitAction = async (event: FormEvent) => {
    event.preventDefault();
    const session = await getSession(credentials);

    if (session) setPayments(session.payment_method_categories);
  };

  const parsePaymentsNames = (payments: PaymentMethods) => {
    const paymentNames = payments.map(payment => payment.name.replaceAll(/_/g, " "));

    return (
      paymentNames.map(paymentName => <li className={classes.list} key={paymentName} >{paymentName}</li>)
    )
  }

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
      <Box mt={5} mb={5} display="flex">
        <small>Click Submit to list all available Payments for this MID in Germany. </small>
        {payments &&
        <Paper className={classes.apiResponse}>
          {parsePaymentsNames(payments)}
        </Paper>
        }
      </Box>
    </Box>
  );
}
