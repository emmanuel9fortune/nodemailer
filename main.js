const nodeMailer = require('nodemailer');
const express = require('express');
const cors = require('cors'); // Add CORS import
const path = require('path');
const fs = require('fs').promises;

const app = express();

// CORS configuration to allow requests from specific origins
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests from this origin
    credentials: true,                 // Enable credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'OPTIONS'],       // Allowed methods
    allowedHeaders: 'Content-Type, Authorization' // Allowed headers
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions));  // This will handle preflight requests for all routes

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Welcome email endpoint
app.post('/welcome', async (req, res) => {
    try {
        const filepath = path.join(__dirname, 'welcome.html');
        let html = await fs.readFile(filepath, 'utf8');

        html = html.replace('[Name]', req.body.name);

        let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "capitradx@gmail.com",
                pass: "izjmzzenjzonbmkc"
            }
        });

        await transporter.sendMail({
            from: 'no-reply <capitradx@gmail.com>',
            to: req.body.email,
            subject: 'Welcome to Capitradx',
            text: 'Experience trading in a whole new way',
            html: html
        });

        res.status(200).send("Email sent successfully!");
    } catch (error) {
        res.status(500).send("Error sending email: " + error.message);
    }
});

// Admin notification email endpoint
app.post('/admin', async (req, res) => {
    try {
        const filepath = path.join(__dirname, 'admin.html');
        let html = await fs.readFile(filepath, 'utf8');

        html = html.replace('[Name]', req.body.name);

        let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "capitradx@gmail.com",
                pass: "izjmzzenjzonbmkc"
            }
        });

        await transporter.sendMail({
            from: 'no-reply <capitradx@gmail.com>',
            to: 'akhalumehemmanuel@gmail.com',
            subject: 'User Signed up',
            text: 'New sign up Today',
            html: html
        });

        res.status(200).send("Admin email sent successfully!");
    } catch (error) {
        res.status(500).send("Error sending admin email: " + error.message);
    }
});


app.get('/', function(req, res) {
    res.set('Content-Type','text/html; charset=utf-8')
    res.send('html')
})


// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
