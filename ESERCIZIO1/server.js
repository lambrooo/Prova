const express = require('express');
const path = require('path');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// CRUD Operations

// Create - Add new user
app.post('/api/users', (req, res) => {
    const user = req.body;
    res.status(201).json({ message: 'User created', user });
});

// Read - Get all users
app.get('/api/users', (req, res) => {
    res.json({ users: [] }); // Replace with actual data
});

// Read - Get one user
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    res.json({ user: { id, name: 'Example User' } });
});  

// Update - Modify user
app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    res.json({ message: `User ${id} updated`, user });
});

// Delete - Remove user
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: `User ${id} deleted` });
});

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server and open browser
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    
    try {
        // To use this feature, install the 'open' package:
        // npm install open
        const open = require('open');
        open(`http://localhost:${port}`);
    } catch (error) {
        console.log('Please open http://localhost:3000 in your browser');
    }
});
