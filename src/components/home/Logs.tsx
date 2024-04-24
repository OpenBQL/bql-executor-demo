import { RootState } from "@/store";
import { Box, Stack } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

export type ILogsProps = {
  syntaxError: any;
  logs: any[];
};

const Logs: React.FC<ILogsProps> = ({ syntaxError, logs }) => {
  const { account } = useSelector((state: RootState) => state.wallet.walletMsg);
  return (
    <Box
      sx={{
        bgcolor: "var(--so-body3)",
        border: "1px solid var(--so-border)",
        borderTop: "none",
        px: 20,
        py: 16,
        fontSize: 14,
        height: "100%",
        overflowX: "auto",
      }}
    >
      {syntaxError && (
        <pre style={{ color: "var(--so-brown)", margin: 0 }}>
          Syntax Error: {syntaxError}
        </pre>
      )}
      <Stack spacing={16}>
        {logs.map(({ type, timeStamp, runId, message }, index) => (
          <div key={index}>
            <pre style={{ margin: 0 }}>
              {moment(timeStamp).format("YYYY/MM/DD hh:mm:ss")} {"|"}{" "}
              <Box
                component="span"
                sx={{
                  color:
                    type === "error" || type === "params"
                      ? "var(--so-brown)"
                      : "var(--so-text)",
                }}
              >
                {type === "error" || type === "params" ? "ERROR" : "INFO"}
              </Box>{" "}
              {"| "}
              <Box
                component="span"
                sx={{
                  color:
                    type === "error" || type === "params"
                      ? "var(--so-brown)"
                      : "var(--so-text)",
                }}
              >
                {type === "start" || type === "end" || type === "params"
                  ? `${message}, run_id: ${runId}, address: ${account}`
                  : `Run workflow action ${
                      type === "action" ? "success" : "failed"
                    }, run_id: ${runId}, address: ${account}\n${message}  `}
              </Box>
            </pre>
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default Logs;
