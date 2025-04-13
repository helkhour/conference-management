import React, { useState } from 'react';
import { getTotalCost } from '../../services/costService';
import api from '../../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert
} from '@mui/material';

function CostSummary() {
  const [doctorId, setDoctorId] = useState('');
  const [year, setYear] = useState('');
  const [total, setTotal] = useState(null);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState([]);

  React.useEffect(() => {
    api.get('doctors/')
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setTotal(null);
    getTotalCost(doctorId, year)
      .then(data => setTotal(data.total_amount))
      .catch(error => {
        setError('Failed to calculate total cost. Please try again.');
        console.error(error);
      });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        Cost Summary
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Doctor</InputLabel>
          <Select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            label="Doctor"
            required
          >
            {doctors.map(doc => (
              <MenuItem key={doc.id} value={doc.id}>
                {doc.first_name} {doc.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Year"
          type="number"
          fullWidth
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          className="custom-button"
        >
          Calculate Total
        </Button>
      </form>
      {total !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total Cost: ${total.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
}

export default CostSummary;