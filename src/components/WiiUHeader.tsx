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
      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-button overflow-hidden">
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
          {/* Cloud body */}
          <ellipse cx="15" cy="15" rx="12" ry="5.5" fill="hsl(0 0% 100%)" />
          <ellipse cx="9" cy="11" rx="5.5" ry="5" fill="hsl(0 0% 100%)" />
          <ellipse cx="15" cy="7" rx="6.5" ry="6" fill="hsl(0 0% 100%)" />
          <ellipse cx="21" cy="10.5" rx="5.5" ry="5.5" fill="hsl(0 0% 100%)" />
          {/* Face */}
          <circle cx="11.5" cy="12" r="0.9" fill="hsl(210 25% 45%)" opacity="0.5" />
          <circle cx="18.5" cy="12" r="0.9" fill="hsl(210 25% 45%)" opacity="0.5" />
          <path d="M11.5 15 Q15 18 18.5 15" stroke="hsl(210 25% 45%)" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />
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
