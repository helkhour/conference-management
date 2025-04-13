import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Logo from '../../assets/images/logo.png'; 

function Header() {
    return (
      <AppBar position="static" sx={{ backgroundColor: '#1a3c6c' }}>
        <Toolbar>
          <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
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