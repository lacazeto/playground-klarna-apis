import React from "react";
import Button from "@material-ui/core/Button";

const noop = () => undefined;

type Props = {
  children: React.ReactElement | string;
  disabled?: boolean;
  action?: (event: unknown) => void;
};

export default function KlarnaButton({ disabled = false, children, action = noop }: Props): React.ReactElement {
  return (
    <Button
      variant="contained"
      style={{ backgroundColor: disabled ? "gray" : "#f48fb1", color: "white", marginTop: "10px" }}
      disabled={disabled}
      onClick={action}
      type="submit"
    >
      {children}
    </Button>
  );
}
