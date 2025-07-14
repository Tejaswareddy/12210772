// frontend/src/pages/ShortenPage.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import axios from "axios";

const MAX_URLS = 5;

const ShortenPage = () => {
  const [urlInputs, setUrlInputs] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (index, field, value) => {
    const updated = [...urlInputs];
    updated[index][field] = value;
    setUrlInputs(updated);
  };

  const addMore = () => {
    if (urlInputs.length < MAX_URLS) {
      setUrlInputs([...urlInputs, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    try {
      const newResults = [];
      for (const input of urlInputs) {
        const body = {
          url: input.url,
          ...(input.validity && { validity: parseInt(input.validity) }),
          ...(input.shortcode && { shortcode: input.shortcode }),
        };
        const res = await axios.post("http://localhost:5000/shorturls", body);
        newResults.push(res.data);
      }
      setResults(newResults);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error shortening one or more URLs");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urlInputs.map((input, idx) => (
        <Paper key={idx} style={{ padding: 16, marginBottom: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Original URL"
                fullWidth
                value={input.url}
                onChange={(e) => handleInputChange(idx, "url", e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Validity (min)"
                fullWidth
                value={input.validity}
                onChange={(e) => handleInputChange(idx, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={input.shortcode}
                onChange={(e) => handleInputChange(idx, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
      {urlInputs.length < MAX_URLS && (
        <Button onClick={addMore}>Add More</Button>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Shorten URLs
      </Button>

      <Typography variant="h5" sx={{ mt: 4 }}>Shortened URLs:</Typography>
      {results.map((res, i) => (
        <Paper key={i} sx={{ p: 2, mt: 2 }}>
          <Typography>Short Link: <a href={res.shortLink} target="_blank" rel="noreferrer">{res.shortLink}</a></Typography>
          <Typography>Expires at: {res.expiry}</Typography>
        </Paper>
      ))}

      <Snackbar open={!!error} message={error} autoHideDuration={3000} onClose={() => setError("")} />
    </Container>
  );
};

export default ShortenPage;
