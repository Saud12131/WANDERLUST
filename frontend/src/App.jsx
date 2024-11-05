import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/intro";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import ListingInfo from './pages/listingInfo';
import ProtectedRoute from './auth/routeauth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listingdetails" element={<ListingInfo/>} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
