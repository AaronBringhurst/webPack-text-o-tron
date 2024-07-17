const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("/..client/dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use, trying another port.`);
        const newPort = PORT + 1; // Increment port number
        server.listen(newPort, () => console.log(`Server running on port ${newPort}`));
    } else {
        console.log('Error starting server:', error);
    }
});