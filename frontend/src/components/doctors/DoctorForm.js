import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addDoctor, updateDoctor } from '../../services/doctorService';
import { Box, TextField, Button, Typography } from '@mui/material';

function DoctorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    specialty: '',
    affiliation: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/doctors/${id}/`)
        .then(response => response.json())
        .then(data => setFormData(data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? updateDoctor(id, formData)
      : addDoctor(formData);
    request
      .then(() => navigate('/doctors'))
      .catch(error => console.error(error));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        {id ? 'Edit Doctor' : 'Add Doctor'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="first_name"
          label="First Name"
          fullWidth
          value={formData.first_name}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="last_name"
          label="Last Name"
          fullWidth
          value={formData.last_name}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="specialty"
          label="Specialty"
          fullWidth
          value={formData.specialty}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="affiliation"
          label="Affiliation"
          fullWidth
          value={formData.affiliation}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="phone"
          label="Phone"
          fullWidth
          value={formData.phone}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          className="custom-button"
        >
          {id ? 'Update' : 'Create'}
        </Button>
      </form>
    </Box>
  );
}

export default DoctorForm;