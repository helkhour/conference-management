import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { archiveConference } from '../../services/conferenceService';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import LoadingSpinner from '../common/LoadingSpinner';

function ConferenceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [archiveOpen, setArchiveOpen] = useState(false);

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

  const handleArchive = () => {
    archiveConference(id)
      .then(() => {
        navigate('/conferences');
      })
      .catch(error => {
        console.error(error);
      });
    setArchiveOpen(false);
  };

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
                secondary={
                  <>
                    <Typography component="span">{doc.specialty}</Typography>
                    <br />
                    <Typography component="span">
                      Cost: {doc.cost != null ? `$${parseFloat(doc.cost).toFixed(2)}` : 'None'}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No doctors assigned</Typography>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          className="custom-button"
          onClick={() => setArchiveOpen(true)}
        >
          Archive Conference
        </Button>
      </Box>
      <Dialog open={archiveOpen} onClose={() => setArchiveOpen(false)}>
        <DialogTitle>Confirm Archive</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to archive {conference.title}? It will no longer appear in active lists.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArchiveOpen(false)}>Cancel</Button>
          <Button onClick={handleArchive} className="custom-button">Archive</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ConferenceDetail;