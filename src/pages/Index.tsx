import { useState, useCallback, useRef, useEffect } from "react";
import { useControllerNav } from "@/hooks/useControllerNav";
import WiiUHeader from "@/components/WiiUHeader";
import ConnectionPanel from "@/components/ConnectionPanel";
import FileBrowser, { MOCK_DEVICE_FILES, MOCK_SERVER_FILES, type FileEntry } from "@/components/FileBrowser";
import ActionBar from "@/components/ActionBar";
import TransferStatusBar, { type TransferStatus, type TransferDirection } from "@/components/TransferStatusBar";
import { motion } from "framer-motion";

type FocusZone = "connection" | "device" | "server";

const Index = () => {
  // Connection state
  const [host, setHost] = useState("192.168.1.100");
  const [port, setPort] = useState("21");
  const [username, setUsername] = useState("anonymous");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);

  // Navigation state
  const [focusZone, setFocusZone] = useState<FocusZone>("connection");
  const [connectionField, setConnectionField] = useState(0);
  const [deviceFocus, setDeviceFocus] = useState(0);
  const [serverFocus, setServerFocus] = useState(0);
  const [deviceSelected, setDeviceSelected] = useState<Set<number>>(new Set());
  const [serverSelected, setServerSelected] = useState<Set<number>>(new Set());
  const [storageType, setStorageType] = useState<"internal" | "sd">("internal");

  // File state
  const [deviceFiles] = useState<FileEntry[]>(MOCK_DEVICE_FILES);
  const [serverFiles] = useState<FileEntry[]>(MOCK_SERVER_FILES);
  const [devicePath, setDevicePath] = useState("/storage/emulated/0/");
  const [serverPath, setServerPath] = useState("/home/user/");

  // Transfer state
  const [transferStatus, setTransferStatus] = useState<TransferStatus>("idle");
  const [transferDirection, setTransferDirection] = useState<TransferDirection>("receive");
  const [transferFile, setTransferFile] = useState("");
  const [transferProgress, setTransferProgress] = useState(0);

  const simulateTransfer = useCallback((fileName: string, dir: TransferDirection) => {
    setTransferFile(fileName);
    setTransferDirection(dir);
    setTransferStatus("transferring");
    setTransferProgress(0);

    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 15 + 5;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTransferProgress(100);
        setTimeout(() => setTransferStatus("complete"), 300);
        setTimeout(() => setTransferStatus("idle"), 2500);
      }
      setTransferProgress(Math.min(Math.round(prog), 100));
    }, 200);
  }, []);

  const onNavigate = useCallback(
    (dir: "up" | "down" | "left" | "right") => {
      if (dir === "left" || dir === "right") {
        const zones: FocusZone[] = connected
          ? ["device", "server"]
          : ["connection"];
        if (!connected) return;
        setFocusZone((z) => {
          const idx = zones.indexOf(z === "connection" ? "device" : z);
          if (dir === "left") return zones[Math.max(0, idx - 1)];
          return zones[Math.min(zones.length - 1, idx + 1)];
        });
        return;
      }

      if (focusZone === "connection") {
        setConnectionField((f) => {
          if (dir === "up") return Math.max(0, f - 2);
          return Math.min(3, f + 2);
        });
      } else if (focusZone === "device") {
        setDeviceFocus((f) => {
          if (dir === "up") return Math.max(0, f - 1);
          return Math.min(deviceFiles.length - 1, f + 1);
        });
      } else {
        setServerFocus((f) => {
          if (dir === "up") return Math.max(0, f - 1);
          return Math.min(serverFiles.length - 1, f + 1);
        });
      }
    },
    [focusZone, connected, deviceFiles.length, serverFiles.length]
  );

  const onButton = useCallback(
    (btn: string) => {
      if (btn === "a") {
        if (!connected) {
          // Simulate connect
          setConnected(true);
          setFocusZone("device");
          return;
        }
        // Toggle selection
        if (focusZone === "device") {
          setDeviceSelected((s) => {
            const ns = new Set(s);
            if (ns.has(deviceFocus)) ns.delete(deviceFocus);
            else ns.add(deviceFocus);
            return ns;
          });
        } else if (focusZone === "server") {
          setServerSelected((s) => {
            const ns = new Set(s);
            if (ns.has(serverFocus)) ns.delete(serverFocus);
            else ns.add(serverFocus);
            return ns;
          });
        }
      }

      if (btn === "b") {
        if (connected) {
          // Clear selection or disconnect
          if (deviceSelected.size > 0 || serverSelected.size > 0) {
            setDeviceSelected(new Set());
            setServerSelected(new Set());
          } else {
            setConnected(false);
            setFocusZone("connection");
          }
        }
      }

      if (btn === "x" && connected) {
        // Send selected device files to server
        if (focusZone === "device" && deviceSelected.size > 0) {
          const file = deviceFiles[Array.from(deviceSelected)[0]];
          simulateTransfer(file.name, "send");
          setDeviceSelected(new Set());
        } else if (focusZone === "server" && serverSelected.size > 0) {
          const file = serverFiles[Array.from(serverSelected)[0]];
          simulateTransfer(file.name, "receive");
          setServerSelected(new Set());
        }
      }

      if (btn === "y" && connected) {
        setStorageType((s) => (s === "internal" ? "sd" : "internal"));
      }

      if (btn === "rb" && connected) {
        setFocusZone((z) => (z === "device" ? "server" : "device"));
      }
      if (btn === "lb" && connected) {
        setFocusZone((z) => (z === "server" ? "device" : "server"));
      }
    },
    [
      connected, focusZone, deviceFocus, serverFocus,
      deviceSelected, serverSelected, deviceFiles, serverFiles, simulateTransfer,
    ]
  );

  useControllerNav({ onNavigate, onButton });

  const getActions = () => {
    if (!connected) {
      return [
        { label: "A", btnClass: "btn-a", text: "Connect" },
      ];
    }
    return [
      { label: "A", btnClass: "btn-a", text: "Select" },
      { label: "B", btnClass: "btn-b", text: "Back" },
      { label: "X", btnClass: "btn-x", text: "Transfer" },
      { label: "Y", btnClass: "btn-y", text: "Storage" },
      { label: "LB/RB", btnClass: "btn-x", text: "Switch Panel" },
    ];
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <WiiUHeader
        title="FTP Transfer"
        subtitle={connected ? `Connected to ${host}` : "Connect to start transferring"}
      />

      <div className="px-4 space-y-4">
        {!connected ? (
          <ConnectionPanel
            host={host}
            port={port}
            username={username}
            password={password}
            connected={connected}
            focusedField={focusZone === "connection" ? connectionField : -1}
            onChangeHost={setHost}
            onChangePort={setPort}
            onChangeUsername={setUsername}
            onChangePassword={setPassword}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4" style={{ height: "calc(100vh - 160px)" }}>
            <FileBrowser
              title="Device"
              icon="device"
              files={deviceFiles}
              focusedIndex={focusZone === "device" ? deviceFocus : -1}
              selectedIndices={deviceSelected}
              currentPath={devicePath}
              storageType={storageType}
              onStorageToggle={() =>
                setStorageType((s) => (s === "internal" ? "sd" : "internal"))
              }
            />
            <FileBrowser
              title="Server"
              icon="server"
              files={serverFiles}
              focusedIndex={focusZone === "server" ? serverFocus : -1}
              selectedIndices={serverSelected}
              currentPath={serverPath}
            />
          </div>
        )}

        {/* Connect button when not connected */}
        {!connected && (
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            onClick={() => {
              setConnected(true);
              setFocusZone("device");
            }}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-extrabold text-lg shadow-button hover:shadow-focused transition-all active:scale-[0.98]"
          >
            Connect
          </motion.button>
        )}
      </div>

      <TransferStatusBar
        status={transferStatus}
        direction={transferDirection}
        fileName={transferFile}
        progress={transferProgress}
      />

      <ActionBar actions={getActions()} />
    </div>
  );
};

export default Index;
