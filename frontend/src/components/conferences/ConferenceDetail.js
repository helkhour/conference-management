import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import LoadingSpinner from '../common/LoadingSpinner';

function ConferenceDetail() {
  const { id } = useParams();
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`conferences/${id}/`)
      .then(response => {
        setConference(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!conference) return <Typography>Conference not found</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        {conference.title}
      </Typography>
      <Typography><strong>Dates:</strong> {conference.start_date} to {conference.end_date}</Typography>
      <Typography><strong>Location:</strong> {conference.location}, {conference.destination}</Typography>
      <Typography><strong>Description:</strong> {conference.description || 'None'}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Attending Doctors
      </Typography>
      {conference.invited_doctors_detail?.length > 0 ? (
        <List>
          {conference.invited_doctors_detail.map(doc => (
            <ListItem key={doc.id}>
              <ListItemText
                primary={`${doc.first_name} ${doc.last_name}`}
                secondary={doc.specialty}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No doctors assigned</Typography>
      )}
    </Box>
  );
}

export default ConferenceDetail;