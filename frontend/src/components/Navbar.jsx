import React from 'react';
import { AppBar, Toolbar, Typography, Link, Box, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
      <Toolbar>
        {/* Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1.2 }}>
          <span style={{ fontSize: "27px" }}>Chat-GPT</span> 3.o
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link 
            href="/" 
            color="inherit" 
            underline="none" 
            sx={{ mx: 2, fontSize: '1rem', '&:hover': { color: 'red' } }}
          >
            Home
          </Link>
          
          {isAuthenticated && user && (
            <Typography sx={{ mx: 2, fontSize: '1rem', color: 'white' }}>
              {user.name}
            </Typography>
          )}

          {isAuthenticated ? (
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ ml: 2 }}
            >
              Log In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
