import { useState } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert2";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {registerMessage} = useSelector(state => state.auth);


    // From Submit Handler
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if(username.trim() === "") return toast.error('username is required');
      if(email.trim() === "") return toast.error('email is required');
      if(password.trim() === "") return toast.error('password is required');
  
      dispatch(registerUser({ username, email, password }));
    };

    const navigate = useNavigate();
    if(registerMessage){
      Swal.fire({
        title: registerMessage,
        icon: "success"
      }).then(isOk =>{
        if(isOk) navigate('/login')
      })
    }
  return (
    <section className="form-container">
      <h1 className="form-title">Create New Account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-input"
            placeholder="inter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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
          Register
        </button>
      </form>

      <div className="form-footer">
        Alrady have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;
