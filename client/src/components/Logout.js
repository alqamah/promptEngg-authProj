import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const res = await axios.post('/api/users/logout');
        toast.success(res.data.msg);
        navigate('/');
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Logout failed');
        navigate('/');
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Logging out...</h2>
    </div>
  );
};

export default Logout;
