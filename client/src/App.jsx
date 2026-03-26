import { Routes, Route, Navigate } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create" element={<CreatePage />} />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <ListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
