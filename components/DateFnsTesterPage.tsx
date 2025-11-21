import React, { useState } from "react";
import { parse, parseISO, isValid as isValidDate } from "date-fns";

const DateFnsTesterPage: React.FC = () => {
  const [isoInput, setIsoInput] = useState("2025-11-21T10:00:00Z");
  const [isoResult, setIsoResult] = useState<Date | null>(null);
  const [isoError, setIsoError] = useState<string | null>(null);
  const [compactInput, setCompactInput] = useState("20251121");
  const [compactResult, setCompactResult] = useState<Date | null>(null);
  const [compactError, setCompactError] = useState<string | null>(null);

  const handleParseISO = () => {
    try {
      const parsed = parseISO(isoInput.trim());
      if (!isValidDate(parsed)) {
        throw new Error("Parsed date is invalid");
      }
      setIsoResult(parsed);
      setIsoError(null);
      console.log(`[ISO] parseISO("${isoInput}") ⇒`, parsed.toISOString());
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid ISO date string";
      setIsoError(message);
      setIsoResult(null);
      console.error("[ISO] parse error:", message);
    }
  };

  const handleParseCompact = () => {
    try {
      const trimmed = compactInput.trim();
      if (!trimmed) {
        throw new Error("Input cannot be empty");
      }
      const parsed = parse(trimmed, "yyyyMMdd", new Date());
      if (!isValidDate(parsed)) {
        throw new Error("Parsed date is invalid");
      }
      setCompactResult(parsed);
      setCompactError(null);
      console.log(
        `[yyyyMMdd] parse("${trimmed}", "yyyyMMdd") ⇒`,
        parsed.toISOString()
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Invalid yyyyMMdd date string";
      setCompactError(message);
      setCompactResult(null);
      console.error("[yyyyMMdd] parse error:", message);
    }
  };

  const renderResult = (result: Date | null, error: string | null) => {
    if (error) {
      return <p className="text-sm text-red-300">{error}</p>;
    }
    if (result) {
      return (
        <p className="text-sm text-emerald-300">
          Parsed: {result.toISOString()} (
          {result.toLocaleString("en-US", { timeZoneName: "short" })})
        </p>
      );
    }
    return <p className="text-sm text-gray-300">Click “Parse” to see a result.</p>;
  };

  return (
    <div className="w-full max-w-2xl border border-white/10 bg-white/5 rounded-2xl p-6 shadow-2xl shadow-black/30 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-300">
              ISO 8601
            </p>
            <h2 className="text-xl font-semibold">parseISO()</h2>
          </div>
          <button
            type="button"
            onClick={handleParseISO}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
          >
            Parse
          </button>
        </div>
        <input
          className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none"
          value={isoInput}
          onChange={(event) => setIsoInput(event.target.value)}
          placeholder="2025-11-21T10:00:00Z"
        />
        {renderResult(isoResult, isoError)}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-300">
              yyyyMMdd
            </p>
            <h2 className="text-xl font-semibold">parse(..., "yyyyMMdd")</h2>
          </div>
          <button
            type="button"
            onClick={handleParseCompact}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
          >
            Parse
          </button>
        </div>
        <input
          className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none"
          value={compactInput}
          onChange={(event) => setCompactInput(event.target.value)}
          placeholder="yyyyMMdd (e.g. 20251121)"
        />
        {renderResult(compactResult, compactError)}
      </div>
    </div>
  );
};

export default DateFnsTesterPage;

