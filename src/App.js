import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Onboarding from './pages/Onboarding';
import CourseDetails from './pages/CourseDetails';
import Progress from './pages/Progress';
import Tasks from './pages/Tasks';
import Quiz from './pages/Quiz';
import Certificate from './pages/Certificate';
import GoalSetting from "./pages/GoalSetting";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/goals" element={<GoalSetting />} />
      </Routes>
    </Router>
  );
}

export default App;