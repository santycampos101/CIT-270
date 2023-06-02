const https = require('https')
const fs = require('fs')

// to run: "npm run dev"
const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const { createHash } = require('node:crypto');

const app=express();

const port = 3000;

app.use(bodyParser.json()); //allow JSON (Javascript Object Notation) requests

//app.listen(port, ()=> {
   // console.log("Listening on port: " + port);
//});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(3000, () => {
    console.log('Listening...')
  })

app.get('/',(req,res)=>{
    // res.redirect(301,'https://google.com');
    res.send("Welcome to my Node server");
})

app.post('/login', async (req,res)=>{
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;//we need to hash the password the user gave us
    const hashedPassword = createHash('sha3-256').update(password).digest('hex');
    const redisPassword = await redisClient.hGet('hashedpasswords',userName);
    console.log("Password for "+userName+"+redisPassword");
    if (password==="FakePassword123!"){
        //this happens if the password is correct
    res.send("Welcome "+userName);
    } else {
        //this happens if the password is not correct
        res.status(401);//unauthorized
        res.send ("Incorrect password");
    }
});