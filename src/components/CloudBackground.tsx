import { motion } from "framer-motion";

const clouds = [
  { width: 260, height: 80, top: "10%", duration: 45, delay: 0, opacity: 0.45 },
  { width: 200, height: 60, top: "25%", duration: 55, delay: 8, opacity: 0.35 },
  { width: 320, height: 90, top: "50%", duration: 60, delay: 3, opacity: 0.3 },
  { width: 180, height: 55, top: "65%", duration: 50, delay: 15, opacity: 0.4 },
  { width: 240, height: 70, top: "80%", duration: 65, delay: 20, opacity: 0.25 },
  { width: 150, height: 50, top: "38%", duration: 70, delay: 30, opacity: 0.3 },
  { width: 280, height: 85, top: "15%", duration: 52, delay: 25, opacity: 0.2 },
];

const CloudBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft gradient sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-background to-sky-50" />

      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: cloud.width,
            height: cloud.height,
            top: cloud.top,
            opacity: cloud.opacity,
            background:
              "radial-gradient(ellipse at center, hsl(0 0% 100% / 0.9) 0%, hsl(200 60% 95% / 0.6) 50%, transparent 70%)",
            filter: "blur(8px)",
          }}
          initial={{ x: -cloud.width - 50 }}
          animate={{ x: ["calc(-10vw)", "calc(110vw)"] }}
          transition={{
            x: {
              duration: cloud.duration,
              delay: cloud.delay,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  );
};

export default CloudBackground;
