import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  box: {
    padding: "5px",
    width: "35%",
    minWidth: "500px",
  },
  header: {
    overflowX: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    backgroundColor: "yellow"
  },
}));

interface Props {
  sessionId: string;
  clientToken: string;
}

export default function DebugSidePanel(props: Props): React.ReactElement {
  const classes = useStyles();

  const { sessionId, clientToken } = props;

  return (
    <Box className={classes.box} p={3}>
      <strong>
        <i>Session Values:</i>
      </strong>
      <h6 className={classes.header}><i>Session ID: {sessionId}</i></h6>
      <h6 className={classes.header}><i>Client Token: {clientToken}</i></h6>
    </Box>
  );
}
