import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './style.css';
import { apiCall } from '../utilty';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    const res = await apiCall('/api/login', {
      email,
      password,
    });
    if (res.status === 'ok') {
      // TODO: Bad practice -> refresh tokens
      localStorage.setItem('token', res.data);

      alert('You are logged in');
    } else {
      alert(res.error);
    }
  };

  return (
    <div className='form'>
      <h1>Login</h1>
      <form className='login-fields'>
        <TextField
          fullWidth
          placeholder='you@awesome.com'
          label='Your Email'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          placeholder='p@$$w0rd'
          label='Password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color='primary' variant='contained' onClick={loginUser}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
