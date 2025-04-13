import React from 'react';
import DoctorList from '../components/doctors/DoctorList';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function DoctorsPage() {
  return (
    <Box>
      <Box sx={{ p: 3, textAlign: 'right' }}>
        <Button
          variant="contained"
          component={Link}
          to="/doctors/add"
          sx={{ backgroundColor: '#3f6ad8' }}
        >
          Add Doctor
        </Button>
      </Box>
      <DoctorList />
    </Box>
  );
}

export default DoctorsPage;