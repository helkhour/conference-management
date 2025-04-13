import React, { useEffect, useState } from 'react';
import { getDoctors, archiveDoctor } from '../../services/doctorService';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors()
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleArchive = (id) => {
    archiveDoctor(id)
      .then(() => {
        setDoctors(doctors.filter(doc => doc.id !== id));
      })
      .catch(error => console.error(error));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a3c6c' }}>
        Doctors
      </Typography>
      <Grid container spacing={3}>
        {doctors.map(doc => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  {doc.first_name} {doc.last_name}
                </Typography>
                <Typography color="textSecondary">{doc.specialty}</Typography>
                <Typography>{doc.affiliation}</Typography>
                <Typography>{doc.email}</Typography>
                <Typography>{doc.phone || 'No phone'}</Typography>
                <Typography sx={{ mt: 1 }}>
                  Conferences Attended:
                  {doc.conference_ids?.length > 0 ? (
                    <ul>
                      {doc.conference_ids.map(conf => (
                        <li key={conf.id}>{conf.title}</li>
                      ))}
                    </ul>
                  ) : (
                    ' None'
                  )}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/doctors/view/${doc.id}`}
                  className="custom-button"
                  sx={{ mt: 2, mr: 1 }}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/doctors/edit/${doc.id}`}
                  className="custom-button"
                  sx={{ mt: 2, mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleArchive(doc.id)}
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

export default DoctorList;