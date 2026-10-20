import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/login" element={<Login />} />

        {/* private */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
