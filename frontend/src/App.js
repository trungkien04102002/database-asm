import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react'

import './App.css';

import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import Home from './pages/home';
import Error from './pages/error';

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </>
  );

}

export default App;
