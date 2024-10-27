import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/intro";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route index path="/" element={<Intro />} />
        <Route  path="/home" element={<Home />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
