import { useState } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const res = await api.post("/auth/adminlogin", { email, password });
        setUser(res.data.resdata);
        navigate("/");
    } catch (error) {
        setError(error.response.data.message)
    }
  };

  return (
    <div className="flex flex-col gap-2 p-6 max-w-sm mx-auto">
      <h1>ADMIN LOGIN</h1>
      <TextField
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        variant="outlined"
      />
      <TextField
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        variant="outlined"
      />
      <Button onClick={handleLogin} variant="contained" color="primary">
        Login
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
