import React, { useState, useEffect } from 'react';
import { mockLogin } from './mockApi';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  useEffect(() => {
    const isFormValid = validateEmail(email) && validatePassword(password);
    setIsButtonDisabled(!(isFormValid && email && password));

    const formErrors = {};
    if (!validateEmail(email) && email) {
      formErrors.email = 'Please enter a valid email address';
    }
    if (!validatePassword(password) && password) {
      formErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(formErrors);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    const response = await mockLogin(email, password);
    setMessage(response.message);
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="auth__form">
        <h2 className="auth__title">Login</h2>
        
        <div className="auth__input-wrapper">
          <label className="auth__label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth__input"
            required
          />
          {errors.email && <p className="auth__error">{errors.email}</p>}
        </div>
        
        <div className="auth__input-wrapper">
          <label className="auth__label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth__input"
            required
          />
          {errors.password && <p className="auth__error">{errors.password}</p>}
        </div>
        
        <button
          type="submit"
          className="auth__button"
          disabled={isButtonDisabled}
        >
          Login
        </button>
      </form>
      {message && <p className="auth__message">{message}</p>}
    </div>
  );
};

export default App;