import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addConference, updateConference } from '../../services/conferenceService';
import api from '../../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert
} from '@mui/material';

function ConferenceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    destination: '',
    location: '',
    description: '',
    invited_doctors: []
  });
  const [doctors, setDoctors] = useState([]);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    api.get('doctors/')
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));

    if (id) {
      api.get(`conferences/${id}/`)
        .then(response => setFormData(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoctorsChange = (e) => {
    setFormData({ ...formData, invited_doctors: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWarning('');
    const request = id
      ? updateConference(id, formData)
      : addConference(formData);
    request
      .then(response => {
        if (response.warning) {
          setWarning(response.warning);
        } else {
          navigate('/conferences');
        }
      })
      .catch(error => {
        if (error.response && error.response.data.warning) {
          setWarning(error.response.data.warning);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        {id ? 'Edit Conference' : 'Add Conference'}
      </Typography>
      {warning && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {warning}
          <Button
            onClick={() => {
              const request = id
                ? updateConference(id, formData)
                : addConference(formData);
              request.then(() => navigate('/conferences')).catch(console.error);
            }}
            sx={{ ml: 2 }}
          >
            Proceed Anyway
          </Button>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="start_date"
          label="Start Date"
          type="date"
          fullWidth
          value={formData.start_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="end_date"
          label="End Date"
          type="date"
          fullWidth
          value={formData.end_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="destination"
          label="Destination (City/Region)"
          fullWidth
          value={formData.destination}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="location"
          label="Location (Venue)"
          fullWidth
          value={formData.location}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Invited Doctors (Optional)</InputLabel>
          <Select
            multiple
            name="invited_doctors"
            value={formData.invited_doctors}
            onChange={handleDoctorsChange}
            label="Invited Doctors (Optional)"
            renderValue={(selected) => {
              if (selected.length === 0) return "No doctors selected";
              return selected
                .map(id => {
                  const doc = doctors.find(d => d.id === id);
                  return doc ? `${doc.first_name} ${doc.last_name}` : '';
                })
                .join(', ');
            }}
          >
            {doctors.map(doc => (
              <MenuItem key={doc.id} value={doc.id}>
                {doc.first_name} {doc.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default ConferenceForm;