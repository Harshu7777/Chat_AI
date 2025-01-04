import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { generateSummary } from "../services/apiService";

const Summary = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      alert("Please enter text to summarize.");
      return;
    }

    setLoading(true);
    try {
      const summaryText = await generateSummary(inputText);
      setSummary(summaryText);
    } catch (error) {
      console.error("Error getting summary:", error);
      setSummary("An error occurred while generating the summary.");
    } finally {
      setLoading(false);
    }
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
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "text.primary" }}>
          Welcome to Text Summarizer
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      {/* User Info and Logout */}
      <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", alignItems: "center" }}>
        <Avatar src={user.picture} alt={user.name} sx={{ mr: 2 }} />
        <Typography variant="body1" sx={{ mr: 2 }}>{user.name}</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => logout({ returnTo: window.location.origin })}
          sx={{ textTransform: "none" }}
        >
          Log Out
        </Button>
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "text.primary" }}
      >
        Summarize Your Text
      </Typography>

      {/* Summary Output */}
      {summary && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 3,
            width: "80%",
            maxWidth: "600px",
            borderRadius: 2,
            bgcolor: "primary.light",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Summary:
          </Typography>
          <Typography variant="body1">{summary}</Typography>
        </Paper>
      )}

      {/* Input Area */}
      <Paper
        elevation={3}
        sx={{
          width: "80%",
          maxWidth: "600px",
          p: 3,
          borderRadius: 2,
          mt: 3
        }}
      >
        <TextField
          multiline
          rows={8}
          fullWidth
          variant="outlined"
          placeholder="Paste your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSummarize}
          disabled={loading}
          sx={{
            width: "100%",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Summarize"
          )}
        </Button>
      </Paper>
    </Box>
  );
};

export default Summary;

