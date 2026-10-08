import { useState } from "react";
import { Link } from "react-router-dom";

type AuthFormProps = {
    mode: "signup" | "login";
}

export function AuthForm({ mode }: AuthFormProps){
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loginIdentifier, setLoginIdentifier] = useState("");

    const isSignUp = mode === "signup";

    return(
        <form>

            <div>
                <h1>{isSignUp ? "Create an account" : "Log in"}</h1>
                <p>{isSignUp ? "Join the BackCountry Journal to become a part of our outdoor community and gain access to our blogs!" 
                : " Log in to your account to access your profile, comment on posts, and more!"}</p>
            </div>

            {isSignUp && (
                <>
                        <label>
                            Full Name:
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>

                        <label>
                            Username:
                            <input
                                type="text"
                                placeholder="Choose a unique username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </label>

                        <label>
                            Email:
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label>
                            Password:
                            <input
                                type="password"
                                placeholder="Choose a password(Min 8 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>

                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                </>
            )}

            {!isSignUp && (
                <>
                     <label>
                            Username or Email:
                            <input
                                type="text"
                                placeholder="Enter your username or email"
                                value={loginIdentifier}
                                onChange={(e) => setLoginIdentifier(e.target.value)}
                            />
                        </label>

                        <label>
                            Password:
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        
                        <p>
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                </>
            )}

            <button type="submit">
                {isSignUp ? "Sign Up" : "Login"}
            </button>

        </form>
    )
}