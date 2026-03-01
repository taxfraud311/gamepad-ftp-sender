import { motion } from "framer-motion";

interface CloudProps {
  width: number;
  height: number;
  top: string;
  duration: number;
  delay: number;
  opacity: number;
  hasSmile: boolean;
}

const clouds: CloudProps[] = [
  { width: 220, height: 100, top: "8%", duration: 48, delay: 0, opacity: 0.7, hasSmile: true },
  { width: 180, height: 80, top: "28%", duration: 58, delay: 10, opacity: 0.55, hasSmile: false },
  { width: 280, height: 120, top: "48%", duration: 62, delay: 4, opacity: 0.6, hasSmile: true },
  { width: 160, height: 75, top: "68%", duration: 52, delay: 18, opacity: 0.5, hasSmile: true },
  { width: 240, height: 105, top: "82%", duration: 68, delay: 22, opacity: 0.45, hasSmile: false },
  { width: 200, height: 90, top: "38%", duration: 72, delay: 33, opacity: 0.5, hasSmile: true },
  { width: 260, height: 110, top: "18%", duration: 55, delay: 27, opacity: 0.4, hasSmile: false },
];

const Cloud = ({ width, height, top, duration, delay, opacity, hasSmile }: CloudProps) => {
  const bumpW = width * 0.38;
  const bumpH = height * 0.45;

  return (
    <motion.div
      className="absolute"
      style={{ top, opacity }}
      initial={{ x: -width - 80 }}
      animate={{ x: ["calc(-12vw)", "calc(112vw)"] }}
      transition={{
        x: { duration, delay, repeat: Infinity, ease: "linear" },
      }}
    >
      <svg
        width={width}
        height={height + bumpH * 0.6}
        viewBox={`0 0 ${width} ${height + bumpH * 0.6}`}
        fill="none"
      >
        {/* Main cloud body */}
        <ellipse
          cx={width / 2}
          cy={height * 0.55 + bumpH * 0.3}
          rx={width / 2}
          ry={height * 0.4}
          fill="white"
        />
        {/* Left bump */}
        <ellipse
          cx={width * 0.3}
          cy={height * 0.4}
          rx={bumpW * 0.75}
          ry={bumpH * 0.7}
          fill="white"
        />
        {/* Center bump (tallest) */}
        <ellipse
          cx={width * 0.5}
          cy={height * 0.22}
          rx={bumpW}
          ry={bumpH}
          fill="white"
        />
        {/* Right bump */}
        <ellipse
          cx={width * 0.7}
          cy={height * 0.38}
          rx={bumpW * 0.8}
          ry={bumpH * 0.75}
          fill="white"
        />

        {/* Subtle smiley face */}
        {hasSmile && (
          <g opacity={0.18}>
            {/* Left eye */}
            <ellipse
              cx={width * 0.4}
              cy={height * 0.48}
              rx={width * 0.022}
              ry={height * 0.04}
              fill="hsl(210 20% 50%)"
            />
            {/* Right eye */}
            <ellipse
              cx={width * 0.6}
              cy={height * 0.48}
              rx={width * 0.022}
              ry={height * 0.04}
              fill="hsl(210 20% 50%)"
            />
            {/* Smile */}
            <path
              d={`M ${width * 0.4} ${height * 0.6} Q ${width * 0.5} ${height * 0.72} ${width * 0.6} ${height * 0.6}`}
              stroke="hsl(210 20% 50%)"
              strokeWidth={width * 0.012}
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

const CloudBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-background to-sky-50" />

      {clouds.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}
    </div>
  );
};

export default CloudBackground;
