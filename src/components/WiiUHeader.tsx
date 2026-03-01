import { motion } from "framer-motion";

interface WiiUHeaderProps {
  title: string;
  subtitle?: string;
}

const WiiUHeader = ({ title, subtitle }: WiiUHeaderProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-4 px-6 py-4"
    >
      {/* Wii U style rounded icon */}
      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
          <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12h8M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-extrabold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground font-semibold">{subtitle}</p>
        )}
      </div>
    </motion.header>
  );
};

export default WiiUHeader;
