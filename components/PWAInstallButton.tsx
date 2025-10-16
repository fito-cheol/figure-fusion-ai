import React, { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallButtonProps {
  className?: string;
}

const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = "",
}) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      if (
        window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches
      ) {
        setIsInstalled(true);
        return;
      }
      // Check for iOS Safari
      if (window.navigator.standalone === true) {
        setIsInstalled(true);
        return;
      }
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    checkInstalled();
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setShowManualGuide(true);
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        setIsInstalled(true);
      } else {
        console.log("User dismissed the install prompt");
        setErrorMessage("사용자가 설치를 취소했습니다.");
      }
    } catch (error) {
      console.error("Installation failed:", error);
      setErrorMessage(
        `설치 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      setShowManualGuide(true);
    }

    setDeferredPrompt(null);
  };

  const closeManualGuide = () => {
    setShowManualGuide(false);
    setErrorMessage("");
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isChrome = /Chrome/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isEdge = /Edg/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);

    return { isIOS, isAndroid, isChrome, isSafari, isEdge, isFirefox };
  };

  const getManualInstallInstructions = () => {
    const { isIOS, isAndroid, isChrome, isSafari, isEdge, isFirefox } =
      getBrowserInfo();

    if (isIOS) {
      return {
        title: "iOS Safari에서 수동 설치",
        steps: [
          "화면 하단의 공유 버튼(⬆️)을 탭합니다",
          "'홈 화면에 추가'를 선택합니다",
          "'추가' 버튼을 탭하여 설치를 완료합니다",
        ],
        note: "iOS Safari에서는 자동 설치가 지원되지 않습니다.",
      };
    }

    if (isAndroid) {
      return {
        title: "Android Chrome에서 수동 설치",
        steps: [
          "주소창 오른쪽의 메뉴 버튼(⋮)을 탭합니다",
          "'홈 화면에 추가' 또는 '앱 설치'를 선택합니다",
          "설치 확인 팝업에서 '설치'를 탭합니다",
        ],
        note: "Chrome 브라우저에서만 지원됩니다.",
      };
    }

    if (isChrome || isEdge) {
      return {
        title: "데스크톱 Chrome/Edge에서 수동 설치",
        steps: [
          "주소창 오른쪽의 설치 아이콘(⬇️)을 클릭합니다",
          "또는 주소창 오른쪽의 메뉴 버튼(⋮)을 클릭합니다",
          "'앱 설치' 또는 '홈 화면에 추가'를 선택합니다",
        ],
        note: "자동 설치가 지원되지 않는 환경입니다.",
      };
    }

    return {
      title: "수동 설치 안내",
      steps: [
        "브라우저 메뉴에서 '홈 화면에 추가' 또는 '앱 설치' 옵션을 찾아보세요",
        "Chrome, Edge, Safari 등의 최신 브라우저를 사용해주세요",
        "HTTPS 환경에서만 PWA 설치가 가능합니다",
      ],
      note: "현재 브라우저에서는 자동 설치가 지원되지 않습니다.",
    };
  };

  const instructions = getManualInstallInstructions();

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${className}`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18V9"
          />
        </svg>
        앱 설치하기
      </button>

      {showManualGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {instructions.title}
                </h3>
                <button
                  onClick={closeManualGuide}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
              )}

              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">{instructions.note}</p>
              </div>

              <div className="space-y-3">
                {instructions.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={closeManualGuide}
                  className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  닫기
                </button>
                {deferredPrompt && (
                  <button
                    onClick={() => {
                      handleInstallClick();
                      closeManualGuide();
                    }}
                    className="flex-1 bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    다시 시도
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallButton;
