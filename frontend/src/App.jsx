import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import MyPage from './components/Mypage';
import Home from './components/Home';
import Plan from './components/Plan';
import PlanDetail from './components/PlanDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import FindId from './components/FindId';
import FindPassword from './components/FindPassword';
import TravelList from './components/TravelList';
import PlaceDetail from './components/PlaceDetail';

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();

  // 숨길 경로들
  const hideHeaderRoutes = [
    '/sign-in',
    '/sign-up',
    '/find-id',
    '/find-password',
  ];
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        {/* 첫 페이지를 /sign-in으로 리디렉션 */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />

        {/* 로그인 관련 */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />

        {/* 로그인 성공 시 이동될 홈 페이지 */}
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/plan" element={<Plan />} />

        <Route path="/plan-detail" element={<PlanDetail />} />

        {/* 여행 관련 */}
        <Route
          path="/travel/domestic"
          element={<TravelList type="domestic" />}
        />
        <Route
          path="/travel/overseas"
          element={<TravelList type="overseas" />}
        />
        <Route path="/travel/:type/:placeName" element={<PlaceDetail />} />
      </Routes>
    </>
  );
}

export default App;
