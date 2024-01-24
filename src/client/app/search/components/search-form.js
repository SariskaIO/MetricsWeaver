import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://rtc-visualizer.sariska.io/users/login'
      : 'http://localhost:8087/users/login';

    const params = new URLSearchParams(location.search);
    const adminToken = params.get('token');
    // Check if the token exists
    let isAdminLogin  = false;
    let headers =  {
      'Content-Type': 'application/json'
    }
    if (adminToken) {
      headers.Authorization =  'Bearer ' + adminToken;
      isAdminLogin =  true;
    }

    try {
      const response = await fetch('https://rtc-visualizer.sariska.io/users/login', {
        method: 'POST',
        headers,
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;
        if (isAdminLogin) {
          localStorage.setItem('token', adminToken);
        } else {
          localStorage.setItem('token', token);
        }
        setError('');
        window.location.href = '/dashboard';
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const adminToken = params.get('token');
    if (adminToken) {
      handleLogin();
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '400px', margin: 'auto' }}>
        <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
        Analyze and debug conference call.
        </Typography>
        {error && <Typography color="error" style={{ marginBottom: '10px' }}>{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;