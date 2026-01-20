import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/SignIn.css";
import illustration from "../assets/images/signin-illustration.png";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [success, setSuccess] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();

  if (!email) {
    setError("Please enter your email");
    return;
  }

  setError("");
  setLoading(true);

  setTimeout(() => {
    setLoading(false);

    if (isForgot) {
      setSuccess("Password reset link sent to your email");
    } else {
      localStorage.setItem("isAuth", "true");
      navigate("/dashboard");
    }
  }, 1500);
};

  return (
    <div className="signin-page">
      <div className="signin-container">
        {/* ILLUSTRATION */}
        <div className="signin-illustration">
          <img src={illustration} alt="Sign in illustration" />
        </div>

        {/* FORM */}
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-group">
  <label>Password</label>
  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <span
  className="toggle-password"
  onClick={() => setShowPassword(!showPassword)}
  aria-label="Toggle password visibility"
>
  {showPassword ? (
    /* Eye-off icon */
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.74-1.67 1.9-3.2 3.4-4.5" />
      <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
      <path d="M1 1l22 22" />
    </svg>
  ) : (
    /* Eye icon */
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )}
</span>

  </div>
</div>

          <p className="forgot-password">Forgot password?</p>

          {error && <p className="error-text">{error}</p>}


          <button className="signin-btn" type="submit">
            Sign in
          </button>

          <div className="divider">or</div>

          <button className="google-btn" type="button">
            <span>Google</span> SOCIAL
          </button>

          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/SignIn.css";

// const SignIn = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // ✅ REQUIRED
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Invalid credentials");
//         setLoading(false);
//         return;
//       }

//       // ✅ MUST SAVE TOKEN / USER
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // ✅ REDIRECT
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Unable to connect to server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signin-container">
//       <form className="signin-form" onSubmit={handleSubmit}>
//         <h2>Sign In</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {error && <p className="error-text">{error}</p>}

//         <button type="submit" disabled={loading}>
//           {loading ? "Signing in..." : "Sign In"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;
