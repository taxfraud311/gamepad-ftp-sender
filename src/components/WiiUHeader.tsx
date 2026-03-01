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
        <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
          {/* Top-left cloud */}
          <ellipse cx="9" cy="8" rx="5.5" ry="4" fill="hsl(0 0% 100%)" />
          <ellipse cx="7" cy="5.5" rx="3" ry="2.5" fill="hsl(0 0% 100%)" />
          <ellipse cx="11" cy="5" rx="3.5" ry="3" fill="hsl(0 0% 100%)" />
          {/* Left face - looking right/down */}
          <circle cx="9" cy="7" r="0.55" fill="hsl(210 30% 40%)" />
          <circle cx="11.2" cy="7.5" r="0.55" fill="hsl(210 30% 40%)" />
          <path d="M9.2 9.2 Q10.2 10.2 11.2 9.2" stroke="hsl(210 30% 40%)" strokeWidth="0.5" strokeLinecap="round" fill="none" />

          {/* Bottom-right cloud */}
          <ellipse cx="21" cy="16" rx="5.5" ry="4" fill="hsl(0 0% 100%)" />
          <ellipse cx="23" cy="13.5" rx="3" ry="2.5" fill="hsl(0 0% 100%)" />
          <ellipse cx="19" cy="13" rx="3.5" ry="3" fill="hsl(0 0% 100%)" />
          {/* Right face - looking left/up */}
          <circle cx="19" cy="15" r="0.55" fill="hsl(210 30% 40%)" />
          <circle cx="21.2" cy="15.5" r="0.55" fill="hsl(210 30% 40%)" />
          <path d="M19 17.2 Q20.1 18.2 21.2 17.2" stroke="hsl(210 30% 40%)" strokeWidth="0.5" strokeLinecap="round" fill="none" />
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
