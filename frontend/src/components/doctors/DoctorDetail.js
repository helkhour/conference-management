import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import LoadingSpinner from '../common/LoadingSpinner';

function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [conferences, setConferences] = useState([]);
  const [totalCost, setTotalCost] = useState(null);
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [archiveOpen, setArchiveOpen] = useState(false);

  useEffect(() => {
    api.get(`doctors/${id}/`)
      .then(response => {
        setDoctor(response.data);
        const confIds = response.data.conference_ids.map(conf => conf.id);
        // Fetch conferences individually to handle errors
        const fetchConferences = confIds.map(confId =>
          api.get(`conferences/${confId}/`)
            .then(res => res.data)
            .catch(error => {
              console.error(`Error fetching conference ${confId}:`, error);
              return null;
            })
        );
        Promise.all(fetchConferences)
          .then(results => {
            setConferences(results.filter(conf => conf !== null));
            setLoading(false);
          })
          .catch(error => {
            console.error('Error in Promise.all:', error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching doctor:', error);
        setLoading(false);
      });
  }, [id]);

  const fetchTotalCost = () => {
    const url = year ? `doctors/${id}/total-cost/?year=${year}` : `doctors/${id}/total-cost/`;
    api.get(url)
      .then(response => {
        setTotalCost(response.data.total_amount);
      })
      .catch(error => {
        console.error(error);
        setTotalCost(null);
      });
  };

  const handleArchive = () => {
    api.post(`doctors/${id}/archive/`)
      .then(() => {
        navigate('/doctors');
      })
      .catch(error => {
        console.error(error);
      });
    setArchiveOpen(false);
  };

  if (loading) return <LoadingSpinner />;
  if (!doctor) return <Typography>Doctor not found</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        {doctor.first_name} {doctor.last_name}
      </Typography>
      <Typography><strong>Specialty:</strong> {doctor.specialty}</Typography>
      <Typography><strong>Affiliation:</strong> {doctor.affiliation}</Typography>
      <Typography><strong>Email:</strong> {doctor.email}</Typography>
      <Typography><strong>Phone:</strong> {doctor.phone || 'None'}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Conferences Attended
      </Typography>
      {conferences.length > 0 ? (
        <List>
          {conferences.map(conf => (
            <ListItem key={conf.id}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {conf.title}
                    {conf.is_archived && (
                      <Chip label="Archived" size="small" sx={{ ml: 1, bgcolor: '#e0e0e0' }} />
                    )}
                  </Box>
                }
                secondary={`${conf.start_date} to ${conf.end_date}, ${conf.location}, ${conf.destination}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No conferences attended</Typography>
      )}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total Cost
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Year"
          >
            <MenuItem value="">All Years</MenuItem>
            {[2024, 2025, 2026].map(y => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          className="custom-button"
          onClick={fetchTotalCost}
        >
          Calculate
        </Button>
      </Box>
      {totalCost !== null && (
        <Typography sx={{ mt: 1 }}>
          Total: ${totalCost.toFixed(2)} {year ? `for ${year}` : '(All Years)'}
        </Typography>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setArchiveOpen(true)}
        >
          Archive Doctor
        </Button>
      </Box>
      <Dialog open={archiveOpen} onClose={() => setArchiveOpen(false)}>
        <DialogTitle>Confirm Archive</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to archive {doctor.first_name} {doctor.last_name}? They will no longer appear in active lists.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArchiveOpen(false)}>Cancel</Button>
          <Button onClick={handleArchive} color="error">Archive</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DoctorDetail;