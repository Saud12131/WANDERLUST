import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/intro";
import Signup from "./pages/signup";
import Login from "./pages/login";
import AllListings from './pages/listings';
import ListingInfo from './pages/listingInfo';
import ProtectedRoute from './auth/routeauth';
import CreateListing from './pages/Createlisting';
import SearchResults from './pages/searchresults';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Intro />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/alllistings" element={<AllListings />} />

        <Route
          path="/newlisting"
          element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listingdetails/:id"
          element={
            <ProtectedRoute>
              <ListingInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
