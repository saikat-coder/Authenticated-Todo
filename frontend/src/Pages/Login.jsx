import './Login.css';
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";




function Login() {
  const navigate = useNavigate();


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
  }


  const handleSUbmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', loginFormData)
      .then(response => {
        if (response.data.message == 'Login successful') {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/todo');
        }
        setMessage(response.data.message);
        setError('');
        setLoginFormData({ email: '', password: '' })
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);  // server message
        } else {
          setError('Login failed');
        }
        setMessage('');
      })

  }


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSUbmit}>
        <h2>Login</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginFormData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginFormData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
