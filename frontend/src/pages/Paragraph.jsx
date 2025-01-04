import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Stack, CircularProgress, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { generateParagraph } from '../services/apiService';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { marked } from 'marked';

const Paragraph = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert('Please enter something to generate.');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await generateParagraph(input);
      setResult(response);
    } catch (error) {
      setResult('An error occurred while generating the paragraph.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      Prism.highlightAll(); // Highlight all code snippets
    }
  }, [result]);

  const renderResult = () => {
    const htmlContent = marked(result); // Convert Markdown to HTML
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "text.primary" }}>
          Welcome to Paragraph Generator
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => loginWithRedirect()}
          sx={{
            py: 1.5,
            px: 4,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: '20px',
            bgcolor: '#4caf50',
            '&:hover': {
              bgcolor: '#45a049',
            },
          }}
        >
          Log In to Continue
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      {/* User Info and Logout */}
      <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", alignItems: "center" }}>
        <Avatar src={user.picture} alt={user.name} sx={{ mr: 2 }} />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => logout({ returnTo: window.location.origin })}
          sx={{ 
            textTransform: "none",
            borderRadius: '20px',
            borderColor: '#4caf50',
            color: '#4caf50',
            '&:hover': {
              bgcolor: '#4caf50',
              color: 'white',
            },
          }}
        >
          Log Out
        </Button>
      </Box>

      {/* Result Display */}
      {result && (
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            bgcolor: 'black',
            p: 3,
            borderRadius: '15px',
            boxShadow: 3,
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Result:
          </Typography>
          <div style={{ overflowX: 'auto' }}>
            {renderResult()}
          </div>
        </Box>
      )}

      {/* Chat Interface Container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          borderRadius: '20px',
          bgcolor: '#fff',
          boxShadow: 3,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          label="Ask me anything..."
          variant="outlined"
          fullWidth
          value={input}
          onChange={handleInputChange}
          sx={{
            mb: 3,
            borderRadius: '20px',
            backgroundColor: '#f1f1f1',
            '& .MuiInputBase-root': {
              borderRadius: '15px',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: '20px',
            bgcolor: '#4caf50',
            '&:hover': {
              bgcolor: '#45a049',
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
        </Button>
      </Box>

      <Stack direction="row" spacing={2} mt={4}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '20px',
            borderColor: '#4caf50',
            color: '#4caf50',
            '&:hover': {
              bgcolor: '#4caf50',
              color: 'white',
            },
          }}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
};

export default Paragraph;
