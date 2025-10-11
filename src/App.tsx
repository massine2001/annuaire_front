import React from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import PoolPage from './pages/Pool';

function App() {

  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path=''element={<Home />} />
        <Route path="/pool" element={<PoolPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
