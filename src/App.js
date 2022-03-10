import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/Auth/RequireAuth";
import { useAuthContext } from "./context/Auth/AuthContext";
import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";
import Layout from "./screens/Layout";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  const user = useAuthContext();
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
