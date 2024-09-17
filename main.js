const nodeMailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Use promises for fs

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/welcome', async (req, res) => {
    try {
        const filepath = path.join(__dirname, 'welcome.html'); // Use path.join, not path.json
        let html = await fs.readFile(filepath, 'utf8');

        html = html.replace('[Name]', req.body.name); // Use req.body instead of rea.body

        var transporter = nodeMailer.createTransport({
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



app.post('/admin', async (req, res) => {
    try {
        const filepath = path.join(__dirname, 'admin.html'); // Use path.join
        let html = await fs.readFile(filepath, 'utf8');

        html = html.replace('[Name]', req.body.name); // Fix variable name to req.body

        var transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "capitradx@gmail.com",
                pass: "izjmzzenjzonbmkc"
            }
        });

        await transporter.sendMail({
            from: 'no-reply <capitradx@gmail.com>',
            to: 'akhalumehemmanuel@gmail.com', // Corrected this to a valid email format
            subject: 'User Signed up',
            text: 'New sign up Today',
            html: html
        });

        res.status(200).send("Admin email sent successfully!");
    } catch (error) {
        res.status(500).send("Error sending admin email: " + error.message);
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
