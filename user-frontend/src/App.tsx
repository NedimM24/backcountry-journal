import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import BlogPage from "./pages/Blog/BlogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Category />} />
        <Route path="/posts/:id" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
