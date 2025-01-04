import React from 'react';
import { Box, Typography, Card, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <>
    <Navbar/>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      {/* Welcome Message */}
      <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
        Welcome to Chat-GPT.3o
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
        The best Chatbot in the world
      </Typography>

      {/* Interactive Cards Container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          mb: 4,
        }}
      >
        {/* Summarize Text Card */}
        <Card
          onClick={() => handleCardClick('/summary')}
          sx={{
            boxShadow: 4,
            borderRadius: 5,
            height: 200,
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
            "&:hover": {
              border: 2,
              borderColor: 'primary.main',
              backgroundColor: 'primary.main',
              boxShadow: 8,
              transform: 'scale(1.05)',
              cursor: 'pointer',
            },
          }}
          aria-label="Navigate to Summarize Text"
        >
          <DescriptionRounded sx={{ fontSize: 80, color: 'green', mb: 1 }} />
          <Typography variant="h5" sx={{ textAlign: 'center', color: 'black' }}>
            Summarize Text
          </Typography>
            <h6 className='text-center'>Summaries the long text into the short text into understand better</h6>
        </Card>

        {/* Generate Paragraph or Code Card */}
        <Card
          onClick={() => handleCardClick('/generate')}
          sx={{
            boxShadow: 4,
            borderRadius: 5,
            height: 200,
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
            "&:hover": {
              border: 2,
              borderColor: 'primary.main',
              backgroundColor: 'primary.main',
              boxShadow: 8,
              transform: 'scale(1.05)',
              cursor: 'pointer',
            },
          }}
          aria-label="Navigate to Generate Paragraph or Code"
        >
          <DescriptionRounded sx={{ fontSize: 80, color: 'green', mb: 1 }} />
          <Typography variant="h6" sx={{ textAlign: 'center', color: 'black' }}>
            Generate Paragraph or Code
          </Typography>
            <h6 className='text-center'>Generate Paragraph or Code and find the solution</h6>
        </Card>
      </Box>

      {/* Additional Navigation Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/features')}
          sx={{ px: 4, py: 1 }}
          aria-label="Explore Features"
        >
          Explore Features
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('#')}
          sx={{ px: 4, py: 1 }}
          aria-label="Contact Us"
        >
          Contact Us
        </Button>
      </Stack>
    </Box>
    </>
  );
};

export default HomePage;
