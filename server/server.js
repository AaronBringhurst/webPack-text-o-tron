const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Debugging: Log the current directory and its contents
console.log('Current directory:', __dirname);
console.log('Directory contents:', fs.readdirSync(__dirname));
console.log('Parent directory contents:', fs.readdirSync(path.join(__dirname, '..')));

// Attempt to serve static files from multiple possible locations
const possiblePaths = [
  path.join(__dirname, '../client/dist'),
  path.join(__dirname, '../dist'),
  path.join(__dirname, '../../client/dist'),
  path.join(__dirname, 'client/dist')
];

possiblePaths.forEach(staticPath => {
  console.log(`Trying to serve static files from: ${staticPath}`);
  if (fs.existsSync(staticPath)) {
    console.log(`Static path exists: ${staticPath}`);
    app.use(express.static(staticPath));
  } else {
    console.log(`Static path does not exist: ${staticPath}`);
  }
});

// Handle requests to the root
app.get('*', (req, res) => {
  const indexPaths = possiblePaths.map(p => path.join(p, 'index.html'));
  for (let indexPath of indexPaths) {
    console.log(`Trying to serve: ${indexPath}`);
    if (fs.existsSync(indexPath)) {
      console.log(`Found index.html at: ${indexPath}`);
      return res.sendFile(indexPath);
    }
  }
  res.status(404).send('Not found');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));