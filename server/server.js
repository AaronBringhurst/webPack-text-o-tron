const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build directory
const staticPath = path.join(__dirname, '../client/dist');
console.log('Serving static files from:', staticPath);
app.use(express.static(staticPath));

// Handle requests to the root
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  console.log('Attempting to serve:', indexPath);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));