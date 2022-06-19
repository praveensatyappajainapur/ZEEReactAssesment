import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Dashboard = React.lazy(() => import("../components/Dashboard"));

const Router = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </React.Suspense>
  );
};
export default Router;
