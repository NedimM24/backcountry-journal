import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";
import { ButtonSpinner } from "../../components/LoadingSpinner/ButtonSpinner";

type AuthFormProps = {
  mode: "signup" | "login";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //NEED THIS CONDITIONAL TO CHOOSE WHAT FORM TO DISPLAY
  const isSignUp = mode === "signup";

  //COMMUNICATES WITH MY DB WHENEVER SUBMIT IS CLICKED
  //IF WE ARE SIGNING UP, SENDS NEW USER TO DB
  //OTHERWISE WE ARE CONFIRMING THE LOGIN TO VERIFY USER AND ALLOW ACCESS
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //SIGN UP HANDLER
    if (isSignUp) {
      //CONFIRM PW CHECK
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return;
      }
      setIsLoading(true);
      console.log("Loading:", true);

      //OBJECT THAT HOLDS THE USERS INPUTTED DATA
      const userData = {
        name,
        userName,
        email,
        password,
      };

      try {
        //SENDING A POST REQUEST TO MY DB
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message || "Signup Failed");
          return;
        }

        console.log(data);
        navigate("/login");
      } catch (error) {
        console.log("Error creating user:", error);
      } finally {
        setIsLoading(false);
      }

      //LOGIN HANDLER
    } else {
      setIsLoading(true);
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

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message || "Login Failed");
          return;
        }

        //I AM SAVING THER JWT RETURNED BY THE BACK END TO LOCALSTORAGE
        localStorage.setItem("token", data.token);

        //IF ALL GOES WELL, SEND THE USER TO HOME PAGE
        navigate("/");
      } catch (error) {
        console.log("Error logging in:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <form className={styles.authContainer} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h1>{isSignUp ? "Create an account" : "Welcome Back"}</h1>
        <p>
          {isSignUp
            ? "Join the BackCountry Journal to become a part of our outdoor community and gain access to our blogs!"
            : " Log in to your account to access your profile, comment on posts, and more!"}
        </p>
      </div>

      {/* IF THE MODE IS SIGN UP */}
      {isSignUp && (
        <>
          <div className={styles.inputContainer}>
            <label>
              Full Name 👤
              <input
                type="text"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Username 👤
              <input
                type="text"
                placeholder="Choose a unique username"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>

            <label>
              Email 📧
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password 🔒
              <input
                type="password"
                placeholder="Choose a password(Min 8 characters)"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label>
              Confirm Password 🔒
              <input
                type="password"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </>
      )}

      {/* IF THE MODE IS LOGIN */}
      {!isSignUp && (
        <>
          <div className={styles.inputContainer}>
            <label>
              Email 📧
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password 🔒
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </>
      )}

      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? <ButtonSpinner /> : isSignUp ? "Sign Up ⇒" : "Login ⇒"}
      </button>
    </form>
  );
}
