import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, MenuItem, Select, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConferenceForm = () => {
  const [formData, setFormData] = useState({
    title: '', start_date: '', end_date: '', destination: '', location: '', description: '', invited_doctors: []
  });
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/doctors/')
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoctorsChange = (e) => {
    setFormData({ ...formData, invited_doctors: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/conferences/', formData)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField name="title" label="Title" fullWidth onChange={handleChange} />
        <TextField name="start_date" label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} />
        <TextField name="end_date" label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} />
        <TextField name="destination" label="Destination" fullWidth onChange={handleChange} />
        <TextField name="location" label="Location" fullWidth onChange={handleChange} />
        <TextField name="description" label="Description" fullWidth multiline onChange={handleChange} />
        <InputLabel>Invited Doctors</InputLabel>
        <Select multiple name="invited_doctors" value={formData.invited_doctors} onChange={handleDoctorsChange} fullWidth>
          {doctors.map(doc => (
            <MenuItem key={doc.id} value={doc.id}>{doc.first_name} {doc.last_name}</MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained">Save</Button>
      </form>
    </Container>
  );
};

export default ConferenceForm;