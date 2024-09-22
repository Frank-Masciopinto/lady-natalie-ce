import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { UilLock } from '@iconscout/react-unicons';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material/styles';
import { API } from '../../src/api';

import { FacebookButton, GoogleButton } from './modules/LoginButtons';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '515px',
    width: '500px',
  },
  password: {
    '-webkit-text-security': 'disc',
  },
  paper: {
    margin: theme.spacing(3, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    marginLeft: '-65px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInSide = ({ setpage }) => {
  const classes = useStyles();
  const handleLogin = (event) => {
    event.preventDefault();
    let email = event.target[0].value;
    let password = document.getElementById('password').value;
    API.login({
      email: email,
      password: password,
      generateAuthToken: 'true',
    }).then((response) => {
      if (response) {
        setpage('userDashboard');
      }
    });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src="../icons/512.png" style={{ height: '100px' }} />
          <Avatar className={classes.avatar}>
            <UilLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className="button-container">
            <FacebookButton />
            <GoogleButton />
          </div>
          <form className={classes.form} validate="true" onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => setpage('signUp')} variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
