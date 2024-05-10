const nodeMailer = require('nodemailer')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors({
    origin : ['http://localhost:3000'],
    methods : ['GET', 'POST'],
    credentials : true
}))
app.use(express.json())



app.post('/verify', (req, res)=>{

    const html = `
        <div style="width:100%; height:100%; ">
            <p>You have received your one time passcode</p>
            <div style="background-color:black; width: 300px; height:300px;color:white;border-radius:20px" >
                <h3 style="width:100%;text-align:center;margin-top:2em;">Your OTP code</h3>
                <p style="font-size:30px;font-weight:800;color:white;margin-top:4em;text-align:center;" >${req.body.password} </p>
            </div>
            <p>Do not share this with anyone.</p>
            <p>If this wasn't you ignore this. Thank you!!</p>
            <a>join now</a>
        </div>
    `

        var transporter = nodeMailer.createTransport({
             service: "gmail",
             auth: {
                 user: "akhalumehemmanuel@gmail.com",
                 pass: "rbvqthscfndipohq"
             }  
         })
     
        transporter.sendMail({
             from : 'no-reply <akhalumehemmanuel@gmail.com>',
             to : req.body.email,
             subject : 'banking',
             text : `${req.body.password}`,
             html : html
         })
     
})

app.post('/signup', (req, res)=>{

    const html = `
        <div style="width:100%; height:100%; ">
            <p>You have received your one time passcode</p>
            <p>Do not share this with anyone.</p>
            <p>If this wasn't you ignore this. Thank you!!</p>
        </div>
    `

        var transporter = nodeMailer.createTransport({
             service: "gmail",
             auth: {
                 user: "akhalumehemmanuel@gmail.com",
                 pass: "rbvqthscfndipohq"
             }  
         })
     
        transporter.sendMail({
             from : 'no-reply <akhalumehemmanuel@gmail.com>',
             to : req.body.email,
             subject : 'Welcome to Banking',
             text : `${req.body.password}`,
             html : html
         })
     
})

app.post('/mail', (req, res)=>{

    const html = `
        <div style="width:100%; height:100%; ">
            <p>You have received your one time passcode</p>
            <div style="background-color:black; width: 300px; height:300px;color:white;border-radius:20px" >
                <h3 style="width:100%;text-align:center;margin-top:2em;">Your OTP code</h3>
                <p style="font-size:30px;font-weight:800;color:white;margin-top:4em;text-align:center;" >${req.body.password} </p>
            </div>
            <p>Do not share this with anyone.</p>
            <p>If this wasn't you ignore this. Thank you!!</p>
        </div>
    `

        var transporter = nodeMailer.createTransport({
             service: "gmail",
             auth: {
                 user: "akhalumehemmanuel@gmail.com",
                 pass: "rbvqthscfndipohq"
             }  
         })
     
        transporter.sendMail({
             from : 'no-reply <akhalumehemmanuel@gmail.com>',
             to : req.body.email,
             subject : 'banking',
             text : `${req.body.password}`,
             html : html
         })
     
})

app.get('/', function(req, res) {
    res.set('Content-Type','text/html; charset=utf-8')
    res.send('<h1>Contest</h1>')
})


app.listen(3000)