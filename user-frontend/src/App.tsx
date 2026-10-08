import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import SignUp from './pages/SignUp/SignUp'
import Login from "./pages/Login/Login";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
