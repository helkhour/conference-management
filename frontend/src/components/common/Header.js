import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Conference Management
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/conferences">Conferences</Button>
        <Button color="inherit" component={Link} to="/doctors">Doctors</Button>
        <Button color="inherit" component={Link} to="/costs">Costs</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;