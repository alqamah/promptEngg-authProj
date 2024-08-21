// src/components/Signin.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const gotoProtected = () => {
    console.log('Protected resource accessed');
    window.location.href = '/protected';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/users/signin', { email, password });
      toast.success(res.data.msg);
      console.log(res.data);
      // Optional: Redirect to a different page or store authentication state
      // window.location.href = '/protected';
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Server error');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Signin</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        <button type="button" onClick={gotoProtected} className="btn btn-secondary ms-2">Goto Protected Resource</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signin;
