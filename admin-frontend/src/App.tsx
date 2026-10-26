import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute";
import { AdminLayout } from "./components/AdminLayout/AdminLayout";
import { PostForm } from "./components/PostForm/PostForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedAdminRoute />}>
          {/* private */}
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posts/new-post" element={<PostForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
