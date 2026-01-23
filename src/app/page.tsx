import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-black text-gray-900 leading-tight">
          직장인 고민 해결 도구 <br />
          <span className="text-blue-600">런치 드라이브</span>
        </h1>
        <p className="text-gray-500 text-lg">
          오늘 뭐 먹을지 고민하는 시간을 아껴드립니다.
        </p>

        <div className="flex flex-col gap-4 justify-center pt-8">
          {/* 위치 안내 페이지로 이동 */}
          <Link
            href="/location"
            className="px-8 py-4 bg-green-500 text-white rounded-full font-bold text-xl hover:bg-green-600 transition-all shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2"
          >
            📍 주변 맛집 검색하기
          </Link>

          <Link
            href="/lunch"
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 text-center"
          >
            🍱 메뉴 추천 시작하기
          </Link>
        </div>
      </section>
    </main>
  );
}
