import React, { useState } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';

function LoginSignup({ setUser }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        await API.post('/signup', formData);
        alert('Signup successful! Please login.');
        setIsSignup(false);
      } else {
        const res = await API.post('/login', {
          email: formData.email,
          password: formData.password,
        });

        const userData = res.data;
        setUser(userData);

        // Redirect based on role
        if (userData.role === 'teacher') {
          navigate('/teacher');
        } else if (userData.role === 'student') {
          navigate('/student');
        } else {
          alert('Unknown role. Cannot redirect.');
        }
      }
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
            /><br /><br />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        /><br /><br />

        {isSignup && (
          <>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select><br /><br />
          </>
        )}

        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>

      <p>
        {isSignup ? 'Already have an account?' : 'New user?'}{' '}
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Login' : 'Signup'}
        </button>
      </p>
    </div>
  );
}

export default LoginSignup;
