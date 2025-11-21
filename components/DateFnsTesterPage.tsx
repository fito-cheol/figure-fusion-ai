import React, { useState } from "react";
import { parse, parseISO, isValid as isValidDate } from "date-fns";

const DateFnsTesterPage: React.FC = () => {
  const [isoInput, setIsoInput] = useState("2025-11-21T10:00:00Z");
  const [isoResult, setIsoResult] = useState<Date | null>(null);
  const [isoError, setIsoError] = useState<string | null>(null);
  const [compactInput, setCompactInput] = useState("20251121");
  const [compactResult, setCompactResult] = useState<Date | null>(null);
  const [compactError, setCompactError] = useState<string | null>(null);
  const [formatFlowResult, setFormatFlowResult] = useState<{
    formatted: string;
    normalizedDate: Date;
    year: number;
  } | null>(null);
  const [formatFlowError, setFormatFlowError] = useState<string | null>(null);

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
        error instanceof Error ? error.message : "Invalid yyyyMMdd date string";
      setCompactError(message);
      setCompactResult(null);
      console.error("[yyyyMMdd] parse error:", message);
    }
  };

  const handleFormatFlow = () => {
    try {
      const trimmed = compactInput.trim();
      if (!/^\d{8}$/.test(trimmed)) {
        throw new Error("yyyyMMdd 형식(숫자 8자리)이어야 합니다.");
      }
      const formatted = `${trimmed.slice(0, 4)}.${trimmed.slice(
        4,
        6
      )}.${trimmed.slice(6, 8)}`;
      const normalized = `${trimmed.slice(0, 4)}-${trimmed.slice(
        4,
        6
      )}-${trimmed.slice(6, 8)}`;
      const normalizedDate = new Date(normalized);
      if (!isValidDate(normalizedDate)) {
        throw new Error("포맷된 문자열로 만든 Date가 유효하지 않습니다.");
      }
      setFormatFlowResult({
        formatted,
        normalizedDate,
        year: normalizedDate.getFullYear(),
      });
      setFormatFlowError(null);
      console.log(
        `[FormatFlow] ${trimmed} → ${formatted} → ${normalizedDate.toISOString()} → ${normalizedDate.getFullYear()}`
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "yyyyMMdd 포맷 흐름 실행 중 에러 발생";
      setFormatFlowError(message);
      setFormatFlowResult(null);
      console.error("[FormatFlow] error:", message);
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
    return (
      <p className="text-sm text-gray-300">Click “Parse” to see a result.</p>
    );
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
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-indigo-300">
                포맷 → Date → getFullYear
              </p>
              <h3 className="text-lg font-semibold">yyyyMMdd 흐름 확인</h3>
            </div>
            <button
              type="button"
              onClick={handleFormatFlow}
              className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
            >
              실행
            </button>
          </div>
          {formatFlowError && (
            <p className="text-sm text-red-300">{formatFlowError}</p>
          )}
          {formatFlowResult ? (
            <div className="space-y-1 text-sm text-emerald-200">
              <p>formatted: {formatFlowResult.formatted}</p>
              <p>
                new Date: {formatFlowResult.normalizedDate.toISOString()} (
                {formatFlowResult.normalizedDate.toLocaleString()})
              </p>
              <p>getFullYear(): {formatFlowResult.year}</p>
            </div>
          ) : (
            !formatFlowError && (
              <p className="text-sm text-gray-300">
                yyyyMMdd 문자열을 입력하고 [실행]을 누르면 흐름을 확인할 수
                있어요.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DateFnsTesterPage;
