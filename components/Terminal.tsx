"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { terminalCommands, personalInfo } from "@/data/portfolio";
import { FiTerminal, FiMinimize2, FiMaximize2, FiX } from "react-icons/fi";
import { useSoundContext } from "@/contexts/SoundContext";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "system",
      content:
        '🖥️  NEXUS Terminal v2.0 — Type "help" to see available commands',
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [matrixMode, setMatrixMode] = useState(false);
  const { play } = useSoundContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add input line
    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: cmd },
    ];

    if (trimmedCmd === "") {
      setLines(newLines);
      return;
    }

    if (trimmedCmd === "clear") {
      setLines([
        {
          type: "system",
          content: "Terminal cleared. Type \"help\" for available commands.",
        },
      ]);
      return;
    }

    if (trimmedCmd === "resume") {
      window.open(personalInfo.resumeUrl, "_blank");
      newLines.push({
        type: "output",
        content: terminalCommands["resume"],
      });
      setLines(newLines);
      return;
    }

    if (trimmedCmd === "matrix") {
      setMatrixMode(true);
      setTimeout(() => setMatrixMode(false), 5000);
      newLines.push({
        type: "output",
        content: terminalCommands["matrix"],
      });
      setLines(newLines);
      return;
    }

    // Check for project number
    if (/^[1-6]$/.test(trimmedCmd)) {
      const projectNames = [
        "Nexus AI",
        "SynthWave Store",
        "DevFlow",
        "CloudNest",
        "Neural Canvas",
        "Pulse Chat",
      ];
      const idx = parseInt(trimmedCmd) - 1;
      newLines.push({
        type: "output",
        content: `\n📂 ${projectNames[idx]}\nOpening project details...\n`,
      });
      setLines(newLines);
      return;
    }

    // Look up command
    const response = terminalCommands[trimmedCmd];
    if (response) {
      newLines.push({ type: "output", content: response });
    } else {
      newLines.push({
        type: "error",
        content: `Command not found: "${trimmedCmd}". Type "help" for available commands.`,
      });
    }

    setLines(newLines);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      play("type", 0.2);
      processCommand(currentInput);
      setCommandHistory((prev) => [currentInput, ...prev]);
      setHistoryIndex(-1);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = Object.keys(terminalCommands);
      const match = commands.find((c) => c.startsWith(currentInput));
      if (match) setCurrentInput(match);
    }
  };

  if (!isVisible) return null;

  return (
    <SectionWrapper
      id="terminal"
      title="Terminal"
      subtitle="An interactive way to explore — try typing some commands!"
      number="05"
      className="relative"
    >
      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {matrixMode && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 font-mono text-green-500 text-xs overflow-hidden opacity-30">
              {Array.from({ length: 50 }).map((_, col) => (
                <motion.div
                  key={col}
                  className="absolute top-0 whitespace-nowrap"
                  style={{
                    left: `${col * 2}%`,
                    writingMode: "vertical-rl",
                  }}
                  animate={{ y: ["0vh", "100vh"] }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2,
                  }}
                >
                  {Array.from({ length: 30 })
                    .map(() =>
                      String.fromCharCode(0x30a0 + Math.random() * 96)
                    )
                    .join("")}
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-green-400 font-mono text-2xl z-10"
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ duration: 2 }}
            >
              Wake up, Neo...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <motion.div
        className={`mx-auto transition-all duration-500 ${
          isMaximized
            ? "fixed inset-4 z-[9990]"
            : "max-w-4xl relative"
        }`}
        layout
      >
        <div className="glass rounded-xl overflow-hidden border border-nexus-border/30 shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-nexus-border/20 bg-nexus-surface/50">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsVisible(false)}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors group relative"
              >
                <FiX className="w-2 h-2 absolute inset-0.5 opacity-0 group-hover:opacity-100 text-red-900" />
              </button>
              <button className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors">
                <FiMinimize2 className="w-2 h-2 opacity-0" />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"
              >
                <FiMaximize2 className="w-2 h-2 opacity-0" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-nexus-muted">
              <FiTerminal className="w-3 h-3" />
              <span>nexus@portfolio:~</span>
            </div>

            <div className="text-xs font-mono text-nexus-muted/50">
              bash
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={scrollRef}
            className={`p-4 md:p-6 font-mono text-sm overflow-y-auto bg-nexus-bg/50 ${
              isMaximized ? "h-[calc(100%-48px)]" : "h-80 md:h-96"
            }`}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, index) => (
              <motion.div
                key={index}
                className="mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                {line.type === "input" && (
                  <div className="flex items-start gap-2">
                    <span className="text-nexus-accent shrink-0">
                      ❯
                    </span>
                    <span className="text-nexus-text">{line.content}</span>
                  </div>
                )}
                {line.type === "output" && (
                  <pre className="text-nexus-muted whitespace-pre-wrap pl-4 leading-relaxed">
                    {line.content}
                  </pre>
                )}
                {line.type === "error" && (
                  <div className="text-red-400 pl-4">⚠ {line.content}</div>
                )}
                {line.type === "system" && (
                  <div className="text-nexus-accentAlt/70 pl-0">
                    {line.content}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-nexus-accent shrink-0">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => {
                  setCurrentInput(e.target.value);
                  play("type", 0.1);
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-nexus-text outline-none caret-nexus-accent font-mono text-sm"
                placeholder="Type a command..."
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2 border-t border-nexus-border/10 bg-nexus-surface/30 flex items-center justify-between">
            <div className="flex gap-4 text-xs font-mono text-nexus-muted/40">
              <span>Tab: Autocomplete</span>
              <span>↑↓: History</span>
            </div>
            <div className="text-xs font-mono text-nexus-muted/30">
              {lines.filter((l) => l.type === "input").length} commands
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}