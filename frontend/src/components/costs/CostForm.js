import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCost } from '../../services/costService';
import api from '../../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';

function CostForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    conference: '',
    doctor: '',
    amount: ''
  });
  const [conferences, setConferences] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get('conferences/')
      .then(response => setConferences(response.data))
      .catch(error => console.error(error));
    api.get('doctors/')
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCost(formData)
      .then(() => navigate('/costs'))
      .catch(error => console.error(error));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        Assign Cost
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Conference</InputLabel>
          <Select
            name="conference"
            value={formData.conference}
            onChange={handleChange}
            label="Conference"
            required
          >
            {conferences.map(conf => (
              <MenuItem key={conf.id} value={conf.id}>
                {conf.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Doctor</InputLabel>
          <Select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
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
          name="amount"
          label="Amount ($)"
          type="number"
          fullWidth
          value={formData.amount}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          className="custom-button"
        >
          Assign Cost
        </Button>
      </form>
    </Box>
  );
}

export default CostForm;