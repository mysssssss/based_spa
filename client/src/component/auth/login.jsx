import React, { useState } from 'react';
import axios from 'redaxios';
import { useNavigate } from 'react-router-dom';
// axios.defaults.baseURL = 'http://localhost:5000';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LoginForm() {
  const theme = createTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setFormError('Please fill out all required fields.');
      setTimeout(() => {
        setFormError('');
      }, 4000);
      return;
    }

    // Send the form data to the server using Axios
    axios
      .post('/api/v1/auth/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log('login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.user.name);
        const token = localStorage.getItem('token');

        if (token) {
          return navigate('/admin/dashboard');
        } else {
          return navigate('/login');
        }
      })
      .catch((error) => {
        console.error('login failed:', error);
        setFormError('Authentication failed, please try again.');
        setTimeout(() => {
          setFormError('');
        }, 4000);
        return;
      });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              <h1 className="login">Login</h1>
            </Typography>
            {/* <Box component="form"> */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div
                style={{
                  width: '20rem',
                }}
              >
                {/* <label htmlFor="email">Email:</label> */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="email"
                  // id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div
                style={{
                  width: '20rem',
                }}
              >
                {/* <label htmlFor="password">Password:</label> */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  type="password"
                  // id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div
                style={{
                  width: '20rem',
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  login
                </Button>
              </div>
              <br></br>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              <p className="alreadyRegistered">Don't have an account?</p>{' '}
              <a href="/admin/register">register here</a>
            </Box>
          </Box>

          {/* </Box> */}
        </Container>
      </ThemeProvider>{' '}
      {formError && <div className="error">{formError}</div>}
    </div>
  );
}

export default LoginForm;
