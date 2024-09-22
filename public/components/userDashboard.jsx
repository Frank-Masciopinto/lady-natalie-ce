import React from 'react';

import { makeStyles } from '@mui/material/styles';
import get_Google_User from './modules/google_OAuth';
import get_Facebook_User from './modules/facebook_OAuth';
import { deepPurple } from '@mui/material/colors';
const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: '6px',
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
  },
  logo: {
    '&:hover': {
      cursor: 'pointer',
    },
    height: '65px',
  },
  counterText: {
    padding: '6px',
    textAlign: '-webkit-center',
    fontSize: 'inherit !important',
    fontWeight: 'bold !important',
  },
  counterDigits: {
    fontSize: '20px !important',
    fontWeight: 'bold !important',
  },
  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  borderRight: {
    borderRight: '1px solid black',
  },
  halfWidth: {
    width: '50%',
  },
  flexRowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  paper: {
    height: '75px',
  },
  head: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid rgb(223, 226, 229)',
    borderRadius: '6px 6px 0px 0px',
  },
  spaceBetween: {
    placeContent: 'space-between',
  },
  centerAlign: {
    placeContent: 'center',
  },
  alignLeft: {
    alignItems: 'baseline',
  },
  userInfoBox: {
    width: '315px',
    background: deepPurple['A100'],
  },
  userInfoPadded: {
    margin: '16px',
    borderRadius: '6px',
    backgroundColor: 'white',
    border: '1px solid black',
  },
  functionalityBox: {
    placeContent: 'space-between',
    alignItems: 'center',
    margin: '5px',
  },
  innerPaddedTypography: {
    margin: '5px',
  },
}));

export default function UserDashboard({ setpage, functionalityEnabled }) {
  console.log('rendering');
  console.log(functionalityEnabled);

  //get_Facebook_User()
  //get_Google_User();
  return (
    <div className="App">
      <h1>Login</h1>
    </div>
  );
}
