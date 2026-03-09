"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { terminalCommands, personalInfo } from "@/data/portfolio";
import { useSoundContext } from "@/contexts/SoundContext";
import { FiTerminal, FiMinimize2, FiMaximize2, FiX } from "react-icons/fi";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

const INITIAL_LINES: TerminalLine[] = [
  { type: "system", content: '🖥️  Terminal v1.0 — Type "help" to see available commands' },
];

const PROJECT_NAMES = [
  "FocusFlow", "AI Fashion Analyzer", "AgroInnovate",
  "Stylized Character Walk Animation",
];

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [matrixMode, setMatrixMode] = useState(false);
  const { play } = useSoundContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && matrixMode) {
        setMatrixMode(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [matrixMode]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [...lines, { type: "input", content: cmd }];

    if (!trimmed) {
      setLines(newLines);
      return;
    }

    if (trimmed === "clear") {
      setLines([{ type: "system", content: 'Terminal cleared. Type "help" for available commands.' }]);
      return;
    }

    if (trimmed === "resume") {
      window.open(personalInfo.resumeUrl, "_blank");
      newLines.push({ type: "output", content: terminalCommands.resume });
      setLines(newLines);
      return;
    }

    if (trimmed === "matrix") {
      setMatrixMode(true);
      setTimeout(() => setMatrixMode(false), 6000);
      newLines.push({ type: "output", content: terminalCommands.matrix });
      setLines(newLines);
      return;
    }

    if (trimmed === "stats") {
      const response = terminalCommands[trimmed];
      if (response) {
        newLines.push({ type: "output", content: response });
      }
      setLines(newLines);
      return;
    }

    // Check if last command was 'projects', 'certifications', or 'achievements'
    const lastCommand = lines.filter(l => l.type === 'input').slice(-1)[0]?.content.toLowerCase();
    
    if (/^[1-4]$/.test(trimmed)) {
      let response = null;
      
      // If previous command was certifications and number is 1-2
      if (lastCommand === 'certifications' && /^[1-2]$/.test(trimmed)) {
        response = terminalCommands[`cert-${trimmed}`];
      }
      // If previous command was achievements and number is 1-2
      else if (lastCommand === 'achievements' && /^[1-2]$/.test(trimmed)) {
        response = terminalCommands[`achievement-${trimmed}`];
      }
      // If previous command was projects and number is 1-4
      else if (lastCommand === 'projects') {
        response = terminalCommands[trimmed];
      }
      // Default: treat as project
      else {
        response = terminalCommands[trimmed];
      }
      
      if (response) {
        newLines.push({ type: "output", content: response });
      } else {
        newLines.push({ type: "error", content: `Invalid number for ${lastCommand || 'this context'}.` });
      }
      setLines(newLines);
      return;
    }

    const response = terminalCommands[trimmed];
    if (response) {
      newLines.push({ type: "output", content: response });
    } else {
      newLines.push({ type: "error", content: `Command not found: "${trimmed}". Type "help" for available commands.` });
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
        const next = historyIndex + 1;
        setHistoryIndex(next);
        setCurrentInput(commandHistory[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setCurrentInput(commandHistory[next]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(terminalCommands).find((c) => c.startsWith(currentInput));
      if (match) setCurrentInput(match);
    }
  };

  if (!isVisible) return null;

  return (
    <SectionWrapper id="terminal" title="Terminal" subtitle="An interactive way to explore — try typing some commands!" number="07" className="relative">
      {/* Matrix Code Rain */}
      <AnimatePresence>
        {matrixMode && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Falling code */}
            <div className="absolute inset-0 font-mono text-green-400 text-xs overflow-hidden opacity-40">
              {Array.from({ length: 60 }).map((_, col) => (
                <motion.div
                  key={col}
                  className="absolute top-0 whitespace-nowrap"
                  style={{ left: `${col * 1.8}%`, writingMode: "vertical-rl" }}
                  animate={{ y: ["0vh", "110vh"] }}
                  transition={{ 
                    duration: 2 + Math.random() * 4, 
                    repeat: Infinity, 
                    ease: "linear", 
                    delay: Math.random() * 3 
                  }}
                >
                  {Array.from({ length: 40 }).map(() => 
                    ['const', 'let', 'function', '{}', '()', '=>', 'async', 'await', '0', '1'][Math.floor(Math.random() * 10)]
                  ).join(' ')}
                </motion.div>
              ))}
            </div>

            {/* Center messages */}
            <div className="relative z-10 text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="text-green-400 font-mono text-4xl md:text-5xl font-bold mb-4">
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    &lt;/&gt;
                  </motion.span>
                </div>
                <motion.p
                  className="text-green-300 font-mono text-xl md:text-2xl"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 5, times: [0, 0.2, 0.8, 1] }}
                >
                  "Code is poetry written in logic"
                </motion.p>
              </motion.div>

              <motion.div
                className="text-green-500/60 font-mono text-sm space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <div>→ Building scalable systems...</div>
                <div>→ Solving complex problems...</div>
                <div>→ One commit at a time...</div>
              </motion.div>

              <motion.div
                className="text-green-400 font-mono text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 4 }}
              >
                Press ESC or wait to exit
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Window — ALWAYS DARK */}
      <motion.div
        className={`mx-auto transition-all duration-500 ${isMaximized ? "fixed inset-4 z-[9990]" : "max-w-4xl relative"}`}
        layout
      >
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: "rgba(10, 10, 15, 0.97)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              background: "rgba(15, 15, 20, 0.8)",
            }}
          >
            <div className="flex items-center gap-2">
              <button onClick={() => setIsVisible(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" aria-label="Close terminal" />
              <button className="w-3 h-3 rounded-full bg-yellow-500/80" aria-label="Minimize" />
              <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" aria-label="Maximize" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "#737373" }}>
              <FiTerminal className="w-3 h-3" />
              <span>sangam@portfolio:~</span>
            </div>
            <span className="text-xs font-mono" style={{ color: "rgba(115,115,115,0.5)" }}>bash</span>
          </div>

          {/* Body */}
          <div
            ref={scrollRef}
            className={`p-4 md:p-6 font-mono text-sm overflow-y-auto ${isMaximized ? "h-[calc(100%-48px)]" : "h-80 md:h-96"}`}
            style={{
              background: "rgba(5, 5, 10, 0.95)",
              color: "#e5e5e5",
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, index) => (
              <motion.div key={index} className="mb-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}>
                {line.type === "input" && (
                  <div className="flex items-start gap-2">
                    <span style={{ color: "#00f0ff" }}>❯</span>
                    <span style={{ color: "#e5e5e5" }}>{line.content}</span>
                  </div>
                )}
                {line.type === "output" && <pre className="whitespace-pre-wrap pl-4 leading-relaxed" style={{ color: "#a3a3a3" }}>{line.content}</pre>}
                {line.type === "error" && <div className="pl-4" style={{ color: "#f87171" }}>⚠ {line.content}</div>}
                {line.type === "system" && <div style={{ color: "rgba(123, 97, 255, 0.7)" }}>{line.content}</div>}
              </motion.div>
            ))}

            <div className="flex items-center gap-2 mt-1">
              <span style={{ color: "#00f0ff" }}>❯</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => { setCurrentInput(e.target.value); play("type", 0.1); }}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none font-mono text-sm"
                style={{
                  color: "#e5e5e5",
                  caretColor: "#00f0ff",
                }}
                placeholder="Type a command..."
                autoFocus={false}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.04)",
              background: "rgba(15, 15, 20, 0.5)",
            }}
          >
            <div className="flex gap-4 text-xs font-mono" style={{ color: "rgba(115,115,115,0.4)" }}>
              <span>Tab: Autocomplete</span>
              <span>↑↓: History</span>
            </div>
            <div className="text-xs font-mono" style={{ color: "rgba(115,115,115,0.3)" }}>
              {lines.filter((l) => l.type === "input").length} commands
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}