import { Routes, Route } from 'react-router-dom';
import Hero from '../pages/Hero';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import ProtectedRoute from '../components/route/ProtectedRoute';
import PublicRoute from '../components/route/PublicRoute';
import AllIssues from '../pages/AllIssues';
import MyIssues from '../pages/MyIssues';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route 
        path="/all-issues" 
        element={
          <ProtectedRoute>
            <AllIssues />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-issues" 
        element={
          <ProtectedRoute>
            <MyIssues />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/signin" 
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
