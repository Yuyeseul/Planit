import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MyPage from './components/Mypage';
import Home from './components/Home';
import Plan from './components/Plan';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
