const nodeMailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Use fs.promises for async operations

const app = express();

const aiit = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(aiit));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Welcome email endpoint
app.post('/welcome', async (req, res) => {
    try {
        const filepath = path.join(__dirname, 'welcome.html'); // Path to the HTML file
        let html = await fs.readFile(filepath, 'utf8'); // Read the HTML file asynchronously

        // Replace placeholder [Name] with the actual name from the request body
        html = html.replace('[Name]', req.body.name);

        // Create the transporter for sending the email
        let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "capitradx@gmail.com",
                pass: "izjmzzenjzonbmkc" // Note: Store credentials securely in environment variables in production
            }
        });

        // Send the email
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
        const filepath = path.join(__dirname, 'admin.html'); // Path to the admin HTML file
        let html = await fs.readFile(filepath, 'utf8'); // Read the HTML file asynchronously

        // Replace placeholder [Name] with the actual name from the request body
        html = html.replace('[Name]', req.body.name);

        // Create the transporter for sending the email
        let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "capitradx@gmail.com",
                pass: "izjmzzenjzonbmkc" // Again, use environment variables for credentials
            }
        });

        // Send the admin notification email
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

// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
