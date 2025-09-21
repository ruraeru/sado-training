import { Link, Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      {/* 공통 헤더 */}
      <header className="bg-amber-100 p-4 flex gap-4">
        <h1>내 프로젝트</h1>
        <nav>
          <Link to="/">홈</Link> | <Link to="/about">소개</Link>
        </nav>
      </header>

      <hr />

      {/* 메인 컨텐츠 (페이지가 렌더링될 위치) */}
      <main className="p-4">
        <Outlet />
      </main>

      <hr />

      {/* 공통 푸터 */}
      <footer className="bg-amber-100 p-4 text-center">
        <p>&copy; 2025 My Project</p>
      </footer>
    </div>
  );
};

export default RootLayout;
