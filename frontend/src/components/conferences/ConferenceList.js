import React, { useEffect, useState } from 'react';
import { getConferences, archiveConference } from '../../services/conferenceService';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import LoadingSpinner from '../common/LoadingSpinner';
import { Link } from 'react-router-dom';

function ConferenceList() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConferences()
      .then(data => {
        setConferences(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleArchive = (id) => {
    archiveConference(id)
      .then(() => {
        setConferences(conferences.filter(conf => conf.id !== id));
      })
      .catch(error => console.error(error));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        Conferences
      </Typography>
      <Grid container spacing={3}>
        {conferences.map(conf => (
          <Grid item xs={12} sm={6} md={4} key={conf.id}>
            <Card sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{conf.title}</Typography>
                <Typography color="textSecondary">
                  {conf.start_date} to {conf.end_date}
                </Typography>
                <Typography>{conf.location}, {conf.destination}</Typography>
                <Typography color="textSecondary">{conf.description}</Typography>
                <Typography>
                  Doctors: {conf.invited_doctors.length || 'None'}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/conferences/edit/${conf.id}`}
                  className="custom-button"
                  sx={{ mt: 2, mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleArchive(conf.id)}
                  sx={{ mt: 2 }}
                >
                  Archive
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ConferenceList;