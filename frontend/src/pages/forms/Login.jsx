import { useState } from "react";
import "./form.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    // From Submit Handler
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if(email.trim() === "") return toast.error('email is required');
      if(password.trim() === "") return toast.error('password is required');
  
      dispatch(loginUser({email, password}));
    }

    

  return (
    <section className="form-container">
      <h1 className="form-title">Login To Your Account</h1>
      <form onSubmit={formSubmitHandler} className="form">

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="inter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="inter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="form-btn">
          Login
        </button>
      </form>

      <div className="form-footer">
        Did You Forgot Your Password? <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </section>
  );
};
export default Login;