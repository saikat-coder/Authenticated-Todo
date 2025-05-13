import React from 'react';
import './Home.css';  // Importing the external CSS file
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="logo">MyApp</h2>
        <div>
          <button className="button" onClick={() => navigate('/login')}>Login</button>
          <button className="button signupButton" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      {/* Welcome Section */}
      <header className="header">
        <h1>Welcome to MyApp!</h1>
        <p>Organize your tasks and stay productive with our simple To-Do List app!</p>
      </header>
    </div>
  );
};

export default Home;
