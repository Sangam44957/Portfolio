"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface APIContribution {
  date: string;
  count: number;
}

interface APIResponse {
  contributions?: APIContribution[];
}

const GITHUB_USERNAME = "Sangam44957";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LEVEL_COLORS: Record<number, string> = {
  0: "bg-nexus-border/20",
  1: "bg-nexus-accent/20",
  2: "bg-nexus-accent/40",
  3: "bg-nexus-accent/70",
  4: "bg-nexus-accent",
};

const LEVEL_HOVER: Record<number, string> = {
  0: "hover:bg-nexus-border/40",
  1: "hover:bg-nexus-accent/30",
  2: "hover:bg-nexus-accent/50",
  3: "hover:bg-nexus-accent/80",
  4: "hover:bg-nexus-accent",
};

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 9) return 3;
  return 4;
}

async function fetchContributions(): Promise<ContributionDay[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    );
    const data: APIResponse = await res.json();

    return (data.contributions ?? []).map((c) => ({
      date: c.date,
      count: c.count,
      level: getLevel(c.count),
    }));
  } catch (err) {
    console.error("Failed to fetch GitHub contributions:", err);
    return [];
  }
}

function calcLongestStreak(days: ContributionDay[]): number {
  let max = 0;
  let current = 0;
  for (const d of days) {
    if (d.count > 0) {
      current++;
      if (current > max) max = current;
    } else {
      current = 0;
    }
  }
  return max;
}

export default function GitHubHeatmap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchContributions().then((c) => {
      setData(c);
      setLoading(false);
    });
  }, []);

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const totalContributions = data.reduce((sum, d) => sum + d.count, 0);
  const longestStreak = calcLongestStreak(data);

  const handleCellHover = useCallback((day: ContributionDay, e: React.MouseEvent) => {
    setHoveredDay(day);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 10 });
  }, []);

  const STATS = [
    { label: "Total", value: totalContributions.toLocaleString() },
    { label: "Longest Streak", value: `${longestStreak} days` },
    { label: "Avg/Day", value: (totalContributions / 365).toFixed(1) },
  ];

  return (
    <div ref={ref} className="glass rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FiGithub className="w-5 h-5 text-nexus-accent" />
          <div>
            <h3 className="text-lg font-display font-bold text-nexus-text">GitHub Activity</h3>
            <p className="text-sm text-nexus-muted font-mono">
              {loading
                ? "Loading..."
                : `${totalContributions.toLocaleString()} contributions in the last year`}
            </p>
          </div>
        </div>
        <a
          href={personalInfo.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-nexus-accent hover:underline hidden sm:block"
        >
          View on GitHub →
        </a>
      </div>

      {!loading && (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-nexus-surface/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-nexus-accent font-mono">{stat.value}</div>
                <div className="text-xs text-nexus-muted font-mono">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <div className="overflow-x-auto pb-2">
            {/* Month labels */}
            <div className="flex gap-[3px] mb-1 ml-8 min-w-[700px]">
              {weeks.map((week, i) => {
                if (i % 4 === 0 && week[0]) {
                  const month = new Date(week[0].date).getMonth();
                  return (
                    <span
                      key={i}
                      className="text-[10px] text-nexus-muted/50 font-mono"
                      style={{ width: `${4 * 16}px` }}
                    >
                      {MONTHS[month]}
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px] min-w-[700px]">
              <div className="flex flex-col gap-[3px] mr-1">
                {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-nexus-muted/40 font-mono h-[13px] flex items-center"
                  >
                    {day}
                  </span>
                ))}
              </div>

              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={day.date}
                      className={`w-[13px] h-[13px] rounded-[3px] cursor-pointer transition-all duration-150 ${LEVEL_COLORS[day.level]} ${LEVEL_HOVER[day.level]} hover:ring-1 hover:ring-nexus-accent/40`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: weekIndex * 0.008 + dayIndex * 0.003, duration: 0.2 }}
                      onMouseEnter={(e) => handleCellHover(day, e)}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[10px] text-nexus-muted/40 font-mono">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-[13px] h-[13px] rounded-[3px] ${LEVEL_COLORS[level]}`} />
            ))}
            <span className="text-[10px] text-nexus-muted/40 font-mono">More</span>
          </div>
        </>
      )}

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 glass rounded-lg px-3 py-2 text-xs font-mono pointer-events-none"
          style={{ left: tooltipPos.x, top: tooltipPos.y, transform: "translate(-50%, -100%)" }}
        >
          <span className="text-nexus-accent font-bold">{hoveredDay.count} contributions</span>
          <span className="text-nexus-muted"> on {hoveredDay.date}</span>
        </div>
      )}
    </div>
  );
}