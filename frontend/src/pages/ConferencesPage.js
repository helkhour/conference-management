import React from 'react';
import ConferenceList from '../components/conferences/ConferenceList';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ConferencesPage() {
  return (
    <Box>
      <Box sx={{ p: 3, textAlign: 'right' }}>
        <Button
          variant="contained"
          component={Link}
          to="/conferences/add"
          sx={{ backgroundColor: '#3f6ad8' }}
        >
          Add Conference
        </Button>
      </Box>
      <ConferenceList />
    </Box>
  );
}

export default ConferencesPage;