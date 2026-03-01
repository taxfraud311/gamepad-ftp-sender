import { motion } from "framer-motion";
import { Settings } from "lucide-react";

interface WiiUHeaderProps {
  title: string;
  subtitle?: string;
  onOptionsClick?: () => void;
}

const WiiUHeader = ({ title, subtitle, onOptionsClick }: WiiUHeaderProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-4 px-6 py-4"
    >
      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
          <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12h8M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-extrabold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground font-semibold">{subtitle}</p>
        )}
      </div>
      {onOptionsClick && (
        <button
          onClick={onOptionsClick}
          className="w-10 h-10 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card/70 transition-colors active:scale-95"
        >
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      )}
    </motion.header>
  );
};

export default WiiUHeader;
