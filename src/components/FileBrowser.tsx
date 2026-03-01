import { motion } from "framer-motion";
import {
  Folder, FileText, FileImage, FileArchive, File,
  HardDrive, MemoryStick, ArrowUpFromLine, ArrowDownToLine,
} from "lucide-react";

export interface FileEntry {
  name: string;
  type: "folder" | "file";
  size?: string;
  ext?: string;
}

interface FileBrowserProps {
  title: string;
  icon: "device" | "server";
  files: FileEntry[];
  focusedIndex: number;
  selectedIndices: Set<number>;
  currentPath: string;
  storageType?: "internal" | "sd";
  onStorageToggle?: () => void;
}

function getFileIcon(entry: FileEntry) {
  if (entry.type === "folder") return <Folder className="w-5 h-5 text-wiiu-orange" />;
  const ext = entry.ext?.toLowerCase() || "";
  if (["png", "jpg", "jpeg", "gif", "bmp", "webp"].includes(ext))
    return <FileImage className="w-5 h-5 text-accent" />;
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext))
    return <FileArchive className="w-5 h-5 text-wiiu-orange" />;
  if (["txt", "log", "cfg", "ini", "xml", "json"].includes(ext))
    return <FileText className="w-5 h-5 text-primary" />;
  return <File className="w-5 h-5 text-muted-foreground" />;
}

const FileBrowser = ({
  title, icon, files, focusedIndex, selectedIndices,
  currentPath, storageType, onStorageToggle,
}: FileBrowserProps) => {
  return (
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-card/[0.3] backdrop-blur-sm rounded-2xl shadow-card flex flex-col overflow-hidden h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        {icon === "device" ? (
          <HardDrive className="w-5 h-5 text-primary" />
        ) : (
          <ArrowDownToLine className="w-5 h-5 text-primary" />
        )}
        <h3 className="font-bold text-foreground text-sm">{title}</h3>

        {storageType && onStorageToggle && (
          <button
            onClick={onStorageToggle}
            className="ml-auto flex items-center gap-1.5 text-xs font-bold bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-muted transition-colors"
          >
            {storageType === "internal" ? (
              <HardDrive className="w-3.5 h-3.5" />
            ) : (
              <MemoryStick className="w-3.5 h-3.5" />
            )}
            {storageType === "internal" ? "Internal" : "SD Card"}
          </button>
        )}
      </div>

      {/* Path */}
      <div className="px-4 py-2 bg-secondary/50">
        <p className="text-xs font-semibold text-muted-foreground truncate font-mono">
          {currentPath}
        </p>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto">
        {files.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            Empty folder
          </div>
        ) : (
          files.map((entry, i) => (
            <div
              key={entry.name + i}
              className={`flex items-center gap-3 px-4 py-2.5 transition-all duration-100 cursor-pointer ${
                focusedIndex === i
                  ? "bg-primary/10 controller-focus rounded-lg mx-1"
                  : "hover:bg-muted"
              } ${selectedIndices.has(i) ? "bg-wiiu-blue-light" : ""}`}
            >
              {/* Selection indicator */}
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                  selectedIndices.has(i) ? "bg-primary" : "bg-transparent"
                }`}
              />
              {getFileIcon(entry)}
              <span className="text-sm font-semibold text-foreground flex-1 truncate">
                {entry.name}
              </span>
              {entry.size && (
                <span className="text-xs text-muted-foreground font-mono">
                  {entry.size}
                </span>
              )}
              {entry.type === "folder" && (
                <span className="text-xs text-muted-foreground">▶</span>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default FileBrowser;

export const MOCK_DEVICE_FILES: FileEntry[] = [
  { name: "..", type: "folder" },
  { name: "ROMs", type: "folder" },
  { name: "RetroArch", type: "folder" },
  { name: "Screenshots", type: "folder" },
  { name: "BIOS", type: "folder" },
  { name: "saves", type: "folder" },
  { name: "config.ini", type: "file", size: "2 KB", ext: "ini" },
  { name: "game_backup.zip", type: "file", size: "256 MB", ext: "zip" },
  { name: "box_art.png", type: "file", size: "1.2 MB", ext: "png" },
];

export const MOCK_SERVER_FILES: FileEntry[] = [
  { name: "..", type: "folder" },
  { name: "Games", type: "folder" },
  { name: "BIOS Files", type: "folder" },
  { name: "Themes", type: "folder" },
  { name: "homebrew_v2.3.zip", type: "file", size: "45 MB", ext: "zip" },
  { name: "retroarch.cfg", type: "file", size: "8 KB", ext: "cfg" },
  { name: "wallpaper.jpg", type: "file", size: "3.4 MB", ext: "jpg" },
  { name: "readme.txt", type: "file", size: "1 KB", ext: "txt" },
];
