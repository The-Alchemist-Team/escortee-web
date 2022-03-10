import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/Auth/RequireAuth";
import { useAuthContext } from "./context/Auth/AuthContext";
import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";
import Layout from "./screens/Layout";
import Login from "./screens/Login";
import NewPlaceForm from "./screens/NewPlaceForm";
import Register from "./screens/Register";
import Verify from "./screens/Verify";
import AddFeatures from "./screens/AddFeatures";

function App() {
  const user = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add-place" element={<NewPlaceForm />} />
            <Route path="/dashboard/verify" element={<Verify />} />
            <Route path="/dashboard/add-feature" element={<AddFeatures />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
