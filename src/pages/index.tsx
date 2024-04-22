import { Editor } from "@monaco-editor/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Tooltip,
  Typography,
  IconButton,
  Input,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import yaml from "js-yaml";
import { LoadingButton } from "@mui/lab";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useSelector } from "react-redux";
import { show } from "@ebay/nice-modal-react";
import { RootState } from "@/store";
import { solanaRPC } from "@/config";
import { getNetworkType, validateStructure } from "@/utils";
import { Executor } from "test-ya";
import Logs from "@/components/home/Logs";
import { blockchain, wrapBlockchain } from "@/config/blockchain";
import ChainNetworkDialog from "@/components/common/chainNetworkDialog";
import ConnectNetworkDialog from "@/components/common/connectWalletDialog";

export default function Home() {
  const { account, provider, chainId } = useSelector(
    (state: RootState) => state.wallet.walletMsg
  );
  const [value, setValue] = useState(`%YAML 1.2
---\n`);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("run");
  const [update, setUpdate] = useState(false);
  const [syntaxError, setSyntaxError] = useState<any>("");
  const [logs, setLogs] = useState<any>([]);
  const [onDragging, setOnDragging] = useState(false);
  const editorRef = useRef(null);
  const [codeObj, setCodeObj] = useState<any>("");
  const [abiOrIdl, setAbiOrIdl] = useState(null);
  const [jsonError, setJsonError] = useState("");
  const [actionNetwork, setActionNetwork] = useState("");
  const [executor, setExecutor] = useState<Executor>(null);

  useEffect(() => {
    if (value) {
      try {
        const codeObj = yaml.load(value);
        setCodeObj(codeObj);
        if (codeObj) validateStructure(yaml.load(value), setSyntaxError);
      } catch (error) {
        setSyntaxError(error.message);
      }
    }
  }, [value]);

  const handleChange = (v) => {
    setValue(v);
  };
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const startPosition = new monaco.Position(3, 1);
    editor.setPosition(startPosition);
  };

  const runFun = async () => {
    const executor = new Executor(
      value,
      abiOrIdl || {},
      setActionNetwork,
      setLogs,
      solanaRPC
    );
    setExecutor(executor);
    setStatus("pause");
    setLoading(true);
    try {
      await executor.run(provider, account);
      console.log("fffff");
      setUpdate((state) => !state);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setStatus("run");
    }
  };
  const pauseFun = useCallback(() => {
    setStatus("resume");
    executor.pause();
  }, [executor]);
  const resumeFun = useCallback(async () => {
    setStatus("pause");
    try {
      await executor.resume(provider, account);
      setUpdate((state) => !state);
    } catch (error) {
      setLoading(false);
      setStatus("run");
    }
  }, [account, executor, provider]);
  const stopFun = () => {
    executor.stop();
    setLoading(false);
  };
  const handleClick = () => {
    if (status === "run") {
      runFun();
    } else if (status === "pause") {
      pauseFun();
    } else {
      resumeFun();
    }
  };
  const areaChange = (e) => {
    const value = e.target.value;
    try {
      const valueObj = JSON.parse(value);
      setAbiOrIdl(valueObj);
    } catch (error) {
      setJsonError(error.message);
    }
  };

  useEffect(() => {
    if (executor?.currentStep >= executor?.executeList?.length - 1) {
      setLoading(false);
      setStatus("run");
    }
  }, [executor, update]);

  useEffect(() => {
    if (
      actionNetwork &&
      actionNetwork !== blockchain[chainId] &&
      status === "pause"
    ) {
      pauseFun();
      if (getNetworkType(chainId) !== getNetworkType(actionNetwork)) {
        show(ConnectNetworkDialog, {
          title: `Switch to ${
            getNetworkType(actionNetwork) === "solana" ? "Solana" : "EVM"
          } Wallet`,
          type: getNetworkType(actionNetwork),
        });
      } else {
        show(ChainNetworkDialog, {
          title: `Switch to ${wrapBlockchain[actionNetwork]}`,
        });
      }
    }
  }, [actionNetwork, chainId, executor, pauseFun, status]);
  useEffect(() => {
    if (
      actionNetwork &&
      actionNetwork === blockchain[chainId] &&
      status === "resume"
    ) {
      resumeFun();
    }
  }, [actionNetwork, chainId, executor, resumeFun, status]);

  return (
    <Container>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ mt: { xs: 10, md: 60 }, gap: 20 }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: 480 },
            pr: 10,
            height: { xs: "auto", md: "calc(100vh - 160px)" },
            overflow: "auto",
            flexShrink: 0,
          }}
        >
          <Typography sx={{ mb: 10 }}>ABI/IDL</Typography>
          <Input multiline fullWidth rows={8} onChange={areaChange} />
          <Typography sx={{ color: "common.brown", fontSize: 15, mt: 8 }}>
            {abiOrIdl ? jsonError : ""}
          </Typography>
        </Box>
        <Stack
          sx={{
            flex: { xs: "none", md: 1 },
            height: { xs: 600, md: "calc(100vh - 160px)" },
            overflow: "auto",
          }}
        >
          <PanelGroup direction="vertical">
            <Panel
              className="Panel-BQL"
              collapsible={true}
              minSize={30}
              order={1}
            >
              <Stack
                sx={{
                  overflow: "auto",
                  height: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid var(--so-border)",
                    background: "var(--so-body2)",
                    py: 18,
                    width: "100%",
                    flexGrow: 1,
                  }}
                >
                  <Editor
                    width="100%"
                    height="100%"
                    language="yaml"
                    theme="vs-light"
                    loading=""
                    options={{
                      fontSize: "14px",
                      fontFamily: "JetBrains Mono",
                      tabSize: 2,
                    }}
                    value={value}
                    onChange={handleChange}
                    onMount={handleEditorDidMount}
                  />
                  {!value && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "calc(50% + 12px)",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "14px",
                        color: "common.text2",
                      }}
                    >
                      Your BQL code will be displayed here...
                    </Box>
                  )}
                </Box>
              </Stack>
            </Panel>
            <Stack
              direction="row"
              spacing={20}
              sx={{
                border: "1px solid var(--so-border)",
                borderBottom: "none",
                px: 24,
                py: 12,
                bgcolor: "common.body2",
                position: "relative",
              }}
            >
              <LoadingButton
                // loading={loading}
                disabled={!codeObj || !!syntaxError || !account}
                variant="contained"
                color="warning"
                loadingPosition="start"
                startIcon={
                  status === "run" || status === "resume" ? (
                    <Box component="img" src="/imgs/common/pause.svg" />
                  ) : (
                    <Box component="img" src="/imgs/common/run.svg" />
                  )
                }
                sx={{
                  width: "fit-content",
                  bgcolor: "common.text",
                  color: "common.body",
                  ":hover": { bgcolor: "common.text2" },
                }}
                onClick={handleClick}
              >
                {status}
              </LoadingButton>
              <LoadingButton
                disabled={!codeObj || !!syntaxError || !account || !loading}
                variant="contained"
                color="warning"
                loadingPosition="start"
                startIcon={<Box component="img" src="/imgs/common/pause.svg" />}
                sx={{
                  width: "fit-content",
                  bgcolor: "common.text",
                  color: "common.body",
                  ":hover": { bgcolor: "common.text2" },
                }}
                onClick={stopFun}
              >
                Stop
              </LoadingButton>

              <Box sx={{ flex: 1, display: "flex", justifyContent: "end" }}>
                <Tooltip title="Clear the console">
                  <IconButton
                    onClick={() => {
                      setLogs([]);
                    }}
                  >
                    <BlockIcon sx={{ color: "common.text2" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>

            <PanelResizeHandle
              onDragging={(isDragging: boolean) => setOnDragging(isDragging)}
            >
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid",
                  borderColor: onDragging
                    ? "var(--so-cyan)"
                    : "var(--so-border)",
                  ":hover": { borderColor: "var(--so-cyan)" },
                }}
              />
            </PanelResizeHandle>

            <Panel
              className="Panel-BQL"
              collapsible={true}
              defaultSize={20}
              maxSize={70}
              order={2}
            >
              <Logs syntaxError={syntaxError} logs={logs} />
            </Panel>
          </PanelGroup>
        </Stack>
      </Stack>
    </Container>
  );
}
