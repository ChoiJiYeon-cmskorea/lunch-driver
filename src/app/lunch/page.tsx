"use client"; // 클라이언트 측 기능을 사용하기 위해 필수!

import { useState } from "react";
import { useRouter } from "next/navigation";

// 1. 추천할 메뉴 데이터
const LUNCH_MENU = [
  "김치찌개",
  "제육볶음",
  "돈가스",
  "초밥",
  "쌀국수",
  "마라탕",
  "햄버거",
  "파스타",
];

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const router = useRouter();
  // 2. 랜덤 추천 로직
  const pickMenu = () => {
    const randomIndex = Math.floor(Math.random() * LUNCH_MENU.length);
    setSelectedMenu(LUNCH_MENU[randomIndex]);
  };

  // 3. 지도 검색 로직 (네이버 지도 기준)
  const openMap = () => {
    if (!selectedMenu) return;

    // 한글 메뉴명을 URL용 안전한 문자열로 인코딩
    const encodedMenu = encodeURIComponent(selectedMenu);

    // 현재 위치를 브라우저에 물어보고 지도를 엽니다.
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const searchUrl = `https://map.naver.com/p/search/${encodedMenu}?c=${longitude},${latitude},15,0,0,0,dh`;
        window.open(searchUrl, "_blank");
      },
      () => {
        // 위치 권한 거부 시 그냥 키워드로만 검색
        window.open(`https://map.naver.com/p/search/${encodedMenu}`, "_blank");
      },
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">
          오늘 점심 뭐 먹지? 🍱
        </h1>

        {/* 결과창 */}
        <div className="h-24 flex items-center justify-center border-y border-gray-100">
          {selectedMenu ? (
            <div className="animate-bounce">
              <span className="text-4xl font-extrabold text-blue-600">
                {selectedMenu}
              </span>
              <p className="text-gray-500 mt-2 text-sm">이 메뉴 어때요?</p>
            </div>
          ) : (
            <p className="text-gray-400">버튼을 눌러 메뉴를 골라보세요</p>
          )}
        </div>

        {/* 버튼들 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={pickMenu}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all active:scale-95"
          >
            메뉴 추천받기
          </button>

          {selectedMenu && (
            <button
              onClick={openMap}
              className="w-full py-3 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              📍 근처 {selectedMenu} 가게 찾기
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

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
