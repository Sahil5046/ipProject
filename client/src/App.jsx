import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import {useSelector} from "react-redux";
import Spinner from "./components/spinner.jsx";

function App() {
  const [count, setCount] = useState(0);
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? <Spinner/>:
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      }
      </BrowserRouter>
    </>
  );
}

export default App;
