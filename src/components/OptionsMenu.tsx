import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Music, Volume2, VolumeX, Upload, Trash2, X } from "lucide-react";

interface OptionsMenuProps {
  open: boolean;
  onClose: () => void;
  music: {
    isPlaying: boolean;
    fileName: string | null;
    volume: number;
    loadFile: (file: File) => void;
    toggle: () => void;
    setVolume: (v: number) => void;
    clear: () => void;
  };
}

const ACCEPTED = ".mp3,.m4a,.ogg,.wav,.flac,.aac,.wma,.webm";

const OptionsMenu = ({ open, onClose, music }: OptionsMenuProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) music.loadFile(file);
    e.target.value = "";
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-card/90 backdrop-blur-md rounded-3xl shadow-card p-6 z-50 space-y-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-extrabold text-foreground">Options</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Music Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Background Music</span>
              </div>

              {/* Current track */}
              {music.fileName ? (
                <div className="bg-secondary/60 rounded-xl p-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={music.toggle}
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-button active:scale-95 transition-transform"
                    >
                      {music.isPlaying ? (
                        <Volume2 className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-primary-foreground" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">
                        {music.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {music.isPlaying ? "Now playing" : "Paused"}
                      </p>
                    </div>
                    <button
                      onClick={music.clear}
                      className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>

                  {/* Volume slider */}
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={music.volume}
                      onChange={(e) => music.setVolume(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No music loaded</p>
              )}

              {/* Upload button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm shadow-button active:scale-[0.98] transition-transform"
              >
                <Upload className="w-4 h-4" />
                {music.fileName ? "Change Track" : "Load Music File"}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED}
                onChange={handleFileChange}
                className="hidden"
              />

              <p className="text-[10px] text-muted-foreground text-center">
                Supports MP3, M4A, OGG, WAV, FLAC, AAC, WebM
              </p>
            </div>

            {/* Close hint */}
            <div className="flex justify-center pt-2">
              <div className="flex items-center gap-2">
                <span className="btn-label btn-b">B</span>
                <span className="text-xs font-semibold text-muted-foreground">Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OptionsMenu;
