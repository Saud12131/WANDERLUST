import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/signup";
import Login from "./pages/login";
import AllListings from './pages/listings';
import ListingInfo from './pages/listingInfo';
import ProtectedRoute from './auth/routeauth';
import CreateListing from './pages/Createlisting';
import SearchResults from './pages/searchresults';
import UserInfo from './pages/userInfo';
import BookListing from './pages/booklisting';
import PaymentSuccess from './pages/paymentSuccess';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';
import ForgotPass from './pages/ForgotPass';
import ResetPassword from './pages/ResetPassword';
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route index path="/" element={<LandingPage />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/alllistings" element={<AllListings />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/userinfo"
          element={
            <ProtectedRoute>
              <UserInfo />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/mybookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booklisting/:id"
          element={
            <ProtectedRoute>
              <BookListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
              <ForgotPass />
          }
        />
        <Route
          path="/reset-password/:id/:token"
          element={
              <ResetPassword />
          }
        />

        <Route
          path="/booklisting/paymentsuccess"
          element={<PaymentSuccess />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
