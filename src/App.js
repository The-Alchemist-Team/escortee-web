import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./context/Auth/AuthContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  const user = useAuthContext();
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
