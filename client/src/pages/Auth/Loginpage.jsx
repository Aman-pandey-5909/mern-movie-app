import { useState } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.resdata);
      navigate("/");
    } catch (error) { 
      setError(error.response.data.message)
    }
  };

  return (
    <div className="flex flex-col gap-2 p-6 max-w-sm mx-auto border">
      <h1>LOGIN</h1>
      <div className="flex justify-between">
        <p className="text-sm">
          Admin?
          <Button className="text-sm p-0" onClick={() => navigate("/adminlogin")}>Login</Button>
        </p>
        <p className="text-sm">
          Don't have an account?
          <Button className="text-sm p-0" onClick={() => navigate("/signup")}>Signup</Button>
        </p>
      </div>
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
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
