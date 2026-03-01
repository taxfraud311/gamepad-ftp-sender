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
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
          {/* Left cloud */}
          <ellipse cx="8" cy="13" rx="6" ry="4.5" fill="hsl(0 0% 100%)" />
          <ellipse cx="6" cy="10.5" rx="3.5" ry="3" fill="hsl(0 0% 100%)" />
          <ellipse cx="9.5" cy="9" rx="4" ry="3.5" fill="hsl(0 0% 100%)" />
          {/* Left face */}
          <circle cx="6.5" cy="12" r="0.6" fill="hsl(210 30% 40%)" />
          <circle cx="9" cy="12" r="0.6" fill="hsl(210 30% 40%)" />
          <path d="M6.5 13.8 Q7.75 15 9 13.8" stroke="hsl(210 30% 40%)" strokeWidth="0.5" strokeLinecap="round" fill="none" />
          {/* Right cloud */}
          <ellipse cx="20" cy="13" rx="6" ry="4.5" fill="hsl(0 0% 100%)" />
          <ellipse cx="22" cy="10.5" rx="3.5" ry="3" fill="hsl(0 0% 100%)" />
          <ellipse cx="18.5" cy="9" rx="4" ry="3.5" fill="hsl(0 0% 100%)" />
          {/* Right face */}
          <circle cx="19" cy="12" r="0.6" fill="hsl(210 30% 40%)" />
          <circle cx="21.5" cy="12" r="0.6" fill="hsl(210 30% 40%)" />
          <path d="M19 13.8 Q20.25 15 21.5 13.8" stroke="hsl(210 30% 40%)" strokeWidth="0.5" strokeLinecap="round" fill="none" />
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
