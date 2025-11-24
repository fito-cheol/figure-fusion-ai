import React, { useState } from "react";

interface TestCase {
  id: string;
  title: string;
  lang?: string;
  imeMode: "active" | "disabled";
  description: string;
}

const testCases: TestCase[] = [
  {
    id: "no-lang-active",
    title: "lang 없음 + ime-mode: active",
    imeMode: "active",
    description: "lang 속성이 설정되지 않고 ime-mode가 active인 경우",
  },
  {
    id: "no-lang-disabled",
    title: "lang 없음 + ime-mode: disabled",
    imeMode: "disabled",
    description: "lang 속성이 설정되지 않고 ime-mode가 disabled인 경우",
  },
  {
    id: "ko-active",
    title: 'lang="ko" + ime-mode: active',
    lang: "ko",
    imeMode: "active",
    description: "lang이 ko로 설정되고 ime-mode가 active인 경우",
  },
  {
    id: "ko-disabled",
    title: 'lang="ko" + ime-mode: disabled',
    lang: "ko",
    imeMode: "disabled",
    description: "lang이 ko로 설정되고 ime-mode가 disabled인 경우",
  },
  {
    id: "en-active",
    title: 'lang="en" + ime-mode: active',
    lang: "en",
    imeMode: "active",
    description: "lang이 en으로 설정되고 ime-mode가 active인 경우",
  },
  {
    id: "en-disabled",
    title: 'lang="en" + ime-mode: disabled',
    lang: "en",
    imeMode: "disabled",
    description: "lang이 en으로 설정되고 ime-mode가 disabled인 경우",
  },
];

const KeyboardImeTesterPage: React.FC = () => {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleInputChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          한/영 키보드 제어 테스트
        </h1>
        <p className="text-gray-400">
          각 input 필드에서 lang 속성과 ime-mode CSS 속성의 조합을 테스트합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testCases.map((testCase) => {
          const inputId = `input-${testCase.id}`;
          const value = values[testCase.id] || "";

          return (
            <div
              key={testCase.id}
              className="border border-white/10 bg-white/5 rounded-2xl p-6 shadow-2xl shadow-black/30 space-y-4"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white">
                  {testCase.title}
                </h2>
                <p className="text-sm text-gray-400">{testCase.description}</p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={inputId}
                  className="block text-sm font-semibold text-gray-200"
                >
                  테스트 입력 필드
                </label>
                <input
                  id={inputId}
                  type="text"
                  lang={testCase.lang}
                  style={{ imeMode: testCase.imeMode } as React.CSSProperties}
                  value={value}
                  onChange={(e) => handleInputChange(testCase.id, e.target.value)}
                  placeholder="한글과 영문을 입력해보세요..."
                  className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">lang:</span>
                  <code className="px-2 py-1 bg-black/40 rounded">
                    {testCase.lang || "없음"}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">ime-mode:</span>
                  <code className="px-2 py-1 bg-black/40 rounded">
                    {testCase.imeMode}
                  </code>
                </div>
              </div>

              {value && (
                <div className="mt-4 p-3 bg-black/40 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">입력된 값:</p>
                  <p className="text-sm text-emerald-300 font-mono break-all">
                    {value}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    길이: {value.length}자
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 border border-indigo-500/30 bg-indigo-500/10 rounded-2xl">
        <h3 className="text-lg font-semibold text-indigo-300 mb-3">
          테스트 방법
        </h3>
        <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
          <li>각 입력 필드에 한글과 영문을 입력해보세요</li>
          <li>한/영 전환 키를 눌러보고 동작을 확인하세요</li>
          <li>
            ime-mode: active는 IME(입력기)를 활성화하고, disabled는 비활성화합니다
          </li>
          <li>
            lang 속성은 브라우저가 언어를 인식하는 데 도움을 줍니다
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KeyboardImeTesterPage;

