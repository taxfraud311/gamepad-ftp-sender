import { motion } from "framer-motion";

interface ActionBarButton {
  label: string;
  btnClass: string;
  text: string;
}

interface ActionBarProps {
  actions: ActionBarButton[];
}

const ActionBar = ({ actions }: ActionBarProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 bg-wiiu-toolbar/[0.3] backdrop-blur-sm px-6 py-3 flex items-center justify-center gap-6 z-50"
    >
      {actions.map((action, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className={`btn-label ${action.btnClass}`}>{action.label}</span>
          <span className="text-wiiu-toolbar-foreground text-sm font-semibold">
            {action.text}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default ActionBar;
