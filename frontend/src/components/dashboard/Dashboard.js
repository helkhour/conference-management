import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    api.get('conferences/')
      .then(response => setConferences(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Upcoming Conferences</Typography>
      {conferences.map(conf => (
        <Typography key={conf.id}>{conf.title} - {conf.start_date}</Typography>
      ))}
      <Button component={Link} to="/conferences" variant="contained">Manage Conferences</Button>
      <Button component={Link} to="/doctors" variant="contained">Manage Doctors</Button>
      <Button component={Link} to="/costs" variant="contained">Manage Costs</Button>
    </Container>
  );
}

export default Dashboard;