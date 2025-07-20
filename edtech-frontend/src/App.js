import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<LoginSignup setUser={setUser} />} />
      {user?.role === 'teacher' && (
        <Route path="/teacher" element={<TeacherDashboard user={user} />} />
      )}
      {user?.role === 'student' && (
        <Route path="/student" element={<StudentDashboard user={user} />} />
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
