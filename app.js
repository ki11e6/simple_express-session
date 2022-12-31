const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
const app = express();
const port = 3000;

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//authenticaion credentials
const myusername = 'sharath'
const mypassword = '1234'


app.use(express.static('views'))


app.use(
    session(
        {
            secret: "this is a secret key",
            saveUninitialized: true,
            resave: false,
            cookie: {
                expires: 600000
            }
        }
    ));



app.post('/user', (req, res) => {
    if (req.body.username == myusername && req.body.password == mypassword) {
        req.session.userid = req.body.username;
        console.log(req.session.userid);
        res.redirect('/user')
    } else {
        res.send('Invalid UserName Or Password')
    }
})

app.get('/', (req, res) => {
    if (req.session.userid) {
        res.redirect('/user')
    } else {
        res.sendFile('index.html', { root: __dirname })
    }
})

app.get('/user', (req, res) => {
    res.send(`
        <h1>Hi ${req.session.userid}!, Welcome</h1>
        <a href=\'/logout'>LogOut</a>
        `)
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`listening link: http://localhost:${port}`);
})