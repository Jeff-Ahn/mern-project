import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './style.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    const res = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((t) => t.json());
  };

  return (
    <div className='form'>
      <h1>Register</h1>
      <form className='register-fields'>
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
        <Button color='primary' variant='contained' onClick={registerUser}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
