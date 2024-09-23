// WeddingCountdown.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AbsoluteContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10, // Adjust as necessary
}));

const FormContainer = styled('form')(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backdropFilter: 'blur(5px)', // Optional: Adds a blur effect to the background
}));

const Greeting = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#fff', // White text for better contrast
  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
}));

const CountdownContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

const TimeSegment = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  borderRadius: theme.spacing(1),
  minWidth: '80px',
}));

const TimeValue = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#fff', // White text
});

const TimeLabel = styled(Typography)({
  fontSize: '1rem',
  color: '#fff', // White text
});

const WeddingCountdown = () => {
  const [name, setName] = useState('');
  const [weddingDate, setWeddingDate] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [showForm, setShowForm] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedDate = localStorage.getItem('weddingDate');
    if (storedName && storedDate) {
      setName(storedName);
      setWeddingDate(new Date(storedDate));
      setShowForm(false);
    }
  }, []);

  // Set up the countdown timer
  useEffect(() => {
    if (weddingDate) {
      updateTimeRemaining(); // Update immediately
      const interval = setInterval(() => {
        updateTimeRemaining();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [weddingDate]);

  const updateTimeRemaining = () => {
    const now = new Date();
    const difference = weddingDate - now;

    if (difference > 0) {
      const timeLeft = {
        months:
          weddingDate.getMonth() -
          now.getMonth() +
          12 * (weddingDate.getFullYear() - now.getFullYear()),
        days: Math.floor(difference / (1000 * 60 * 60 * 24)) % 30,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      setTimeRemaining(timeLeft);
    } else {
      setTimeRemaining({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && weddingDate) {
      localStorage.setItem('name', name);
      localStorage.setItem('weddingDate', weddingDate);
      setShowForm(false);
    }
  };

  const getGreetingTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour < 12) return 'Dzień dobry'; // Good morning
    if (currentHour < 18) return 'Dzień dobry'; // Good afternoon
    return 'Dobry wieczór'; // Good evening
  };

  return (
    <AbsoluteContainer>
      {showForm ? (
        <FormContainer onSubmit={handleSubmit}>
          <TextField
            label="Imię"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data ślubu"
              value={weddingDate}
              onChange={(newValue) => setWeddingDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} required fullWidth margin="normal" />
              )}
              disablePast
            />
          </LocalizationProvider>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Zapisz
          </Button>
        </FormContainer>
      ) : (
        <Box>
          <Greeting variant="h4">
            {getGreetingTime()} {name}!
          </Greeting>
          <CountdownContainer>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
            >
              Do Twojego ślubu pozostało:
            </Typography>
            <Box>
              <TimeSegment>
                <TimeValue>{timeRemaining.months}</TimeValue>
                <TimeLabel>miesięcy</TimeLabel>
              </TimeSegment>
              <TimeSegment>
                <TimeValue>{timeRemaining.days}</TimeValue>
                <TimeLabel>dni</TimeLabel>
              </TimeSegment>
              <TimeSegment>
                <TimeValue>{timeRemaining.hours}</TimeValue>
                <TimeLabel>godzin</TimeLabel>
              </TimeSegment>
              <TimeSegment>
                <TimeValue>{timeRemaining.minutes}</TimeValue>
                <TimeLabel>minut</TimeLabel>
              </TimeSegment>
              <TimeSegment>
                <TimeValue>{timeRemaining.seconds}</TimeValue>
                <TimeLabel>sekund</TimeLabel>
              </TimeSegment>
            </Box>
          </CountdownContainer>
        </Box>
      )}
    </AbsoluteContainer>
  );
};

export default WeddingCountdown;
