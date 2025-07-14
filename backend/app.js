
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const shortUrlRoutes = require('./routes/shortUrlRoutes');

const app = express();

app.use(cors()); 
app.use(express.json()); 


app.use('/', shortUrlRoutes);


const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
