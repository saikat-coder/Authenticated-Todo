import { useState } from 'react'
import './Signup.css';
import axios from 'axios';
import { Link } from "react-router-dom";

function Signup() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // console.log(formData);

  const handleSUbmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup', formData)
      .then(response => {
        setMessage(response.data.message);
        setError('');
        setFormData({ username: '', email: '', password: '' })
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);  // server message
        } else {
          setError('Registration failed');
        }
        setMessage('');
      })

  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSUbmit} >     {/* // */}
        <h2>Sign Up</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
        <p className="login-link">

          Don't have an account? <Link to="/login">Login</Link>


        </p>
      </form>
    </div>
  );
}

export default Signup;
