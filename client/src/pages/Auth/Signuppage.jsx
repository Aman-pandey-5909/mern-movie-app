import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/");
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  return (
    <div className="flex flex-col gap-2 p-6 max-w-sm mx-auto border">
      <h1>SIGNUP</h1>
      <p className="text-sm">Already have an account?
        <Button className="text-sm p-0" onClick={() => navigate("/login")}>Login</Button>
      </p>
      <TextField
        label="Name"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        variant="outlined"
        required
      />
      <TextField
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        variant="outlined"
        required
      />
      <Button variant="contained" onClick={handleSignup}>Signup</Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
