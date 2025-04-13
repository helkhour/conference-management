import React from 'react';
import CostForm from '../components/costs/CostForm';
import CostSummary from '../components/costs/CostSummary';
import { Box, Typography } from '@mui/material';

function CostsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        Cost Management
      </Typography>
      <CostForm />
      <CostSummary />
    </Box>
  );
}

export default CostsPage;