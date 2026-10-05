import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import "../css/auth.css";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const signUp = useAuthStore((state) => state.signUp);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const isInAccount = useAuthStore((state)=>state.isLoggedIn);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const message = useAuthStore((state) => state.message);
 
  

  async function handleSubmit(e) {
  e.preventDefault()

  if (isLogin) {
    await login(email, password)
  } else {
    if (!isLogin && password !== confirmPassword) {
        alert("Passwords do not match")
        return
    }
    await signUp(email, password, name)
  }
}
  if(isInAccount){
     return (
     <main className="auth-main">
      <img src="/main/main-2.jpg" alt="" />

      <div className="login-content">
        <LogOutSection />
      </div>
      </main>
      )}
  else{
  return (
    

    <main className="auth-main">
      <img src="/main/main-2.jpg" alt="" />

      <div className="login-content">
        
        <h1>{isLogin ? "Sign In" : "Create Account"}</h1>

        <form onSubmit={handleSubmit} id="authForm">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
        </form>
        <button form="authForm" type="submit" disabled={loading}>
            <strong>
                {loading
                  ? "Loading..."
                  : isLogin
                    ? "SIGN IN"
                    : "SIGN UP"}
              </strong>
          </button>

        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}

        <p>
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}

          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            {isLogin ? "Create one" : "Sign in"}
          </span>
        </p>
      </div>
    </main>
  )};
}

function LogOutSection (){
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user)

  return (
    <>
      <div className="log-out-container">
        <h1>Congratulations</h1>
        <p className="greeting-message">
          Hello, {user?.user_metadata?.full_name}
        </p>
        <p>You are logged in with the current email: 
          <br /> <strong>{user?.email}</strong>
          </p>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </>
  )
}