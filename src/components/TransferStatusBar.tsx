import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, CheckCircle, Loader2, AlertCircle } from "lucide-react";

export type TransferStatus = "idle" | "transferring" | "complete" | "error";
export type TransferDirection = "send" | "receive";

interface TransferStatusBarProps {
  status: TransferStatus;
  direction: TransferDirection;
  fileName: string;
  progress: number;
}

const TransferStatusBar = ({ status, direction, fileName, progress }: TransferStatusBarProps) => {
  if (status === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="fixed bottom-14 left-4 right-4 bg-card/90 backdrop-blur-md rounded-2xl shadow-card p-4 z-40"
      >
        <div className="flex items-center gap-3">
          {status === "transferring" && (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          )}
          {status === "complete" && (
            <CheckCircle className="w-5 h-5 text-wiiu-green" />
          )}
          {status === "error" && (
            <AlertCircle className="w-5 h-5 text-destructive" />
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ArrowLeftRight className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-bold text-muted-foreground uppercase">
                {direction === "send" ? "Sending" : "Receiving"}
              </span>
            </div>
            <p className="text-sm font-bold text-foreground truncate">{fileName}</p>
          </div>

          <span className="text-sm font-extrabold text-primary">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransferStatusBar;
