import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import Navbar from './components/navbar/navbar.jsx';
import UserCard from './pages/usercard/usercard.jsx';
import Notification from './pages/notification/notification.jsx';
// Importez vos autres composants ici

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/usercard" element={<UserCard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
