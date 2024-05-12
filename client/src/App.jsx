import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute.jsx";
import ApplyDoctor from "./pages/ApplyDoctor.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import Doctors from "./pages/admin/Doctors.jsx";
import Users from "./pages/admin/Users.jsx";
import Profile from "./pages/doctor/Profile.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Appointments from "./pages/Appointments.jsx";
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path='/notification'
            element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            } />
          <Route path='/admin/users'
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />
          <Route path='/admin/doctors'
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            } />
          <Route path='/doctor/profile/:id'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='/doctor/book-appointment/:doctorId'
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } />
            <Route path='/appoinments'
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path='/doctor-appointments'
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            } />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
