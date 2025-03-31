const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware example - logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Express.js API examples');
});

// Route with parameters
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`User details for ID: ${userId}`);
});

// Query parameters
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`Search results for: ${query}`);
});

// POST method
app.post('/users', (req, res) => {
    const userData = req.body;
    // Logic to create user would go here
    res.status(201).json({
        message: 'User created successfully',
        user: userData
    });
});

// PUT method
app.put('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const userData = req.body;
    // Logic to update user would go here
    res.json({
        message: `User ${userId} updated successfully`,
        user: userData
    });
});

// DELETE method
app.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    // Logic to delete user would go here
    res.json({
        message: `User ${userId} deleted successfully`
    });
});

// Route with multiple handlers
app.get('/protected', 
    (req, res, next) => {
        // Authentication middleware
        const isAuthenticated = true; // Your auth logic here
        if (isAuthenticated) {
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    },
    (req, res) => {
        res.send('Protected content');
    }
);

// Multiple HTTP methods for same route
app
    .route('/api/resource')
    .get((req, res) => {
        res.send('Get resource');
    })
    .post((req, res) => {
        res.send('Create resource');
    })
    .put((req, res) => {
        res.send('Update resource');
    })
    .delete((req, res) => {
        res.send('Delete resource');
    });

// JSON response
app.get('/api/data', (req, res) => {
    res.json({
        name: 'Example',
        status: 'success',
        timestamp: new Date()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler - should be defined last
app.use((req, res) => {
    res.status(404).send('Route not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});