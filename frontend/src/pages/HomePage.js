import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 8,
        backgroundColor: '#1a3c6c',
        color: '#ffffff',
        py: 6,
        borderRadius: 2,
        mx: 2
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        Conference Management
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Organize and track medical conferences with ease.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/conferences"
        sx={{ backgroundColor: '#3f6ad8', fontSize: '1.2rem' }}
      >
        View Conferences
      </Button>
    </Box>
  );
}

export default HomePage;