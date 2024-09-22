const nodeMailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',  // Adjust this based on your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Authorization'
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Welcome email endpoint
app.post('/api/welcome', async (req, res) => {
    try {
        const filepath = path.join(__dirname, 'welcome.html');
        let html = await fs.readFile(filepath, 'utf8');

        html = html.replace('[Name]', req.body.name);

        let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
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

// Admin email endpoint
app.post('/api/admin', async (req, res) => {
    try {
        const filepath = path.join(__dirname, 'admin.html');
        let html = await fs.readFile(filepath, 'utf8');

        html = html.replace('[Name]', req.body.name);

        let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
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

module.exports = app;
