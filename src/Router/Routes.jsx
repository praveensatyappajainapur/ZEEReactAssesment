import { Routes, Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("../components/Dashboard"));

const Routes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </React.Suspense>
  );
};
export default Routes;
