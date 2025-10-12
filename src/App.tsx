import React from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import PoolPage from './pages/Pool';
import JoinPage from './pages/Join';

function App() {

  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path=''element={<Home />} />
        <Route path="/pool" element={<PoolPage />} />
        <Route path='/join' element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
