import { motion } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";

interface ConnectionPanelProps {
  host: string;
  port: string;
  username: string;
  password: string;
  connected: boolean;
  focusedField: number;
  onChangeHost: (v: string) => void;
  onChangePort: (v: string) => void;
  onChangeUsername: (v: string) => void;
  onChangePassword: (v: string) => void;
}

const fields = ["Host / IP", "Port", "Username", "Password"];

const ConnectionPanel = ({
  host, port, username, password, connected, focusedField,
  onChangeHost, onChangePort, onChangeUsername, onChangePassword,
}: ConnectionPanelProps) => {
  const values = [host, port, username, password];
  const handlers = [onChangeHost, onChangePort, onChangeUsername, onChangePassword];

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-card rounded-2xl shadow-card p-5 space-y-3"
    >
      <div className="flex items-center gap-3 mb-4">
        {connected ? (
          <Wifi className="w-5 h-5 text-wiiu-green" />
        ) : (
          <WifiOff className="w-5 h-5 text-muted-foreground" />
        )}
        <h2 className="text-lg font-bold text-foreground">
          {connected ? "Connected" : "FTP Connection"}
        </h2>
        {connected && (
          <span className="ml-auto text-xs font-semibold bg-wiiu-green text-wiiu-green-foreground px-3 py-1 rounded-full">
            Online
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {fields.map((label, i) => (
          <div key={label} className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {label}
            </label>
            <input
              type={i === 3 ? "password" : "text"}
              value={values[i]}
              onChange={(e) => handlers[i](e.target.value)}
              placeholder={i === 1 ? "21" : label}
              className={`w-full bg-secondary text-secondary-foreground rounded-xl px-3 py-2.5 text-sm font-semibold outline-none transition-all duration-150 ${
                focusedField === i ? "controller-focus ring-2 ring-primary" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConnectionPanel;
