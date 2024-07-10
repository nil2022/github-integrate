import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware to parse JSON payloads
app.use(express.json());

// Define a route to handle GitHub webhooks
app.post('/webhook', (req, res) => {
    const payload = req.body;
    
    console.log('\nReceived webhook:', payload);
    
    // You can process the payload here
    // For example, log the commits
    if (payload.commits) {
        payload.commits.forEach(commit => {
            console.log(`New commit by ${commit.author.name}: ${commit.message}`);
        });
    }
    
    // Respond to GitHub
    res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
