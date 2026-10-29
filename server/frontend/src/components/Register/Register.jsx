import React, { useState } from 'react';
import './Register.css';
import Header from '../Header/Header';

const Register = () => {
  const [form, setForm] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/djangoapp/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (response.ok && result.status !== 'error') {
        alert('Registration successful. You can now log in.');
        window.location.href = '/';
      } else {
        alert(result.message || result.error || 'Registration failed. Please check your details.');
      }
    } catch (error) {
      alert('Could not connect to the registration service.');
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container">
        <h1 className="header">Register</h1>
        <form onSubmit={register} className="inputs">
          <div className="input">
            <input className="input_field" name="userName" placeholder="Username"
              value={form.userName} onChange={handleChange} required />
          </div>
          <div className="input">
            <input className="input_field" name="firstName" placeholder="First Name"
              value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="input">
            <input className="input_field" name="lastName" placeholder="Last Name"
              value={form.lastName} onChange={handleChange} required />
          </div>
          <div className="input">
            <input className="input_field" type="email" name="email" placeholder="Email"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="input">
            <input className="input_field" type="password" name="password" placeholder="Password"
              value={form.password} onChange={handleChange} required />
          </div>
          <div className="submit_panel">
            <button className="submit" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
