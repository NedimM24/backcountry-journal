import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../../components/AuthHeader/AuthHeader";

type LoginResponse = {
  token?: string;
  role?: string;
  message?: string;
};

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //COMMUNICATES WITH MY DB WHENEVER SUBMIT IS CLICKED
  //IF WE ARE SIGNING UP, SENDS NEW USER TO DB
  //OTHERWISE WE ARE CONFIRMING THE LOGIN TO VERIFY USER AND ALLOW ACCESS
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setError(data.message || "Login Failed");
        return;
      }

      //ONLY ALLOW ADMIN INTO THIS APPLICATION
      if (data.role !== "admin") {
        setError("This account does not have admin access");
        return;
      }

      if (!data.token) {
        setError("Server could not return an auth token");
        return;
      }

      //I AM SAVING THER JWT RETURNED BY THE BACK END TO LOCALSTORAGE
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      //IF ALL GOES WELL, SEND THE USER TO HOME PAGE
      navigate("/", { replace: true });
    } catch {
      setError("Unable to connect to the server. Please try again.");
    }
  }

  return (
    <div>
      <AuthHeader />
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Admin Login</h1>
          <p>Log in to manage Backcountry Journal</p>
        </div>

        <label>
          Email:
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
