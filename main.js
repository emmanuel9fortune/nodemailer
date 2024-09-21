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
    const html = `
        <div style="width:100%; height:100%; color:black; align-items:center; justify-content:center;font-family: Verdana, Geneva, Tahoma, sans-serif;padding-top:4em;padding-bottom:4em; ">

            <div style="width:100%; display:flex; align-items:center;justify-content:center;">
                <img src='cid:unique@' style="width:50px; height:50px;margin:5px;" />
                <h1>bankname</h1>
            </div>

            <div style="background-color:#fdfdfd; width: 90%; max-width:350px; height:fit-content;color:black;border-radius:10px; border:1px solid #80808057; padding:10px;" >
                <p style="font-size:20px;font-weight:800;color:black;margin-top:.5em;width:100%;text-align:center" >
                    Transaction Alert Service
                </p>

                <p style="font-size:13px;font-weight:600;margin-top:.5em;width:100%;color:cadetblue;text-align:center" >
                    You have been credited!
                </p>
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;" >
                    <span>Transaction Type :</span>
                    <span> Credited</span>
                </p>
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;line-height:22px;" >
                    <span>Account Name :</span>
                    <span> name</span>
                </p>
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;" >
                    <span>Account No :</span>
                    <span> 0909898989</span>
                </p>
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;line-height:22px;" >
                    <span>Transaction Description :</span>
                    <span> Transfer from othername to username </span>
                </p>
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;" >
                    <span>Transaction Location :</span>
                    <span>Online Banking</span>
                </p>
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;" >
                    <span>Transaction Amount :</span>
                    <span> ${numft.format(92092)}</span>
                </p>
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;" >
                    <span>Bank Name :</span>
                    <span> email.com</span>
                </p>
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;" >
                    <span>Transaction Date :</span>
                    <span> email.com</span>
                </p>
                
                
                <p style="font-size:13px;font-weight:600;color:black;margin-top:.5em;width:100%;" >
                    <span>Balance :</span>
                    <span>${numft.format(92092)}</span>
                </p>

                <p style="padding:.5px; background-color:grey; width:60%; margin-top:2em; border-radius:999px;" ></p>

                <p style="font-size:11px;font-weight:300;color:grey;margin-top:.5em;margin-bottom:1em; line-height:18px;" >
                    This email was sent to useremail please visit the 
                    <a href='https://sitename.com'> sitename.com </a> 
                    email subscription portal to update your preferences. If you no longer want to receive emails from us you can
                     <a href='https://sitename.com' >unsubscribe</a> at anytime.
                </p>

                <p style="font-size:10px;font-weight:300;color:grey;margin-top:.05em;width:100%;"> 
                    <a href='https://bankemail.com'> bankemail@mail.com </a>
                </p>
                <p style="font-size:10px;font-weight:300;color:grey;margin-top:.05em;width:100%;" >02-03-2024</p>
                <p style="font-size:10px;font-weight:300;color:grey;margin-top:.05em;width:100%;" > 
                    <a href='https://sitename.com'> https://sitename.com </a> 
                </p>
                <p style="font-size:10px;font-weight:300;color:orange;margin-top:.5em;width:100%;" > 
                    © 2024 bankname inc : 
                    <a style="color:orange" href='https://sitename.com'> current location </a>
                </p>
            </div>
        </div>
    `
    res.set('Content-Type','text/html; charset=utf-8')
    res.send(html)
})


// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
