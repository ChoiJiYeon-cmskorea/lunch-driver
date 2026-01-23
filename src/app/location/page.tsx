"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    daum: any;
  }
}

// 전역 window 객체에 daum 속성이 있음을 타입스크립트에게 알림
declare global {
  interface Window {
    daum: any;
  }
}

export default function LocationPage() {
  const [address, setAddress] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false); // 스크립트 로드 상태 관리
  const router = useRouter();

  // 1. 페이지 진입 시 스크립트가 이미 로드되어 있는지 즉시 확인
  useEffect(() => {
    if (window.daum && window.daum.Postcode) {
      setIsScriptLoaded(true);
    }
    const savedAddress = localStorage.getItem("user-address");
    if (savedAddress) setAddress(savedAddress);
  }, []);

  const openPostcode = () => {
    // 2. window.daum이 직접 존재하는지 한 번 더 체크 (상태값에만 의존하지 않음)
    if (typeof window !== "undefined" && window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          setAddress(data.roadAddress);
          localStorage.setItem("user-address", data.roadAddress);
        },
      }).open();
    } else {
      alert(
        "주소 서비스가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  };

  const handleSearch = () => {
    if (!address.trim()) {
      alert("주소를 먼저 선택해주세요!");
      return;
    }
    const query = encodeURIComponent(`${address} 맛집`);
    window.open(`https://map.naver.com/p/search/${query}`, "_blank");
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* strategy를 'afterInteractive'로 변경하여 로딩 효율화 */}
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center space-y-6">
        <div className="text-5xl">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800">
          정확한 위치를 알려주세요
        </h2>

        <div className="space-y-4 pt-4">
          <div
            onClick={openPostcode}
            className={`w-full px-4 py-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
              address
                ? "border-blue-400 text-blue-600"
                : "border-gray-200 text-gray-400 hover:border-blue-400"
            }`}
          >
            {address || "클릭해서 주소 찾기"}
          </div>

          {address && (
            <button
              onClick={handleSearch}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all"
            >
              이 근처 맛집 검색하기
            </button>
          )}

          <button
            onClick={() => router.back()}
            className="w-full py-3 text-gray-400 font-medium hover:text-gray-600 transition-all"
          >
            뒤로가기
          </button>
        </div>
      </div>
    </main>
  );
}
