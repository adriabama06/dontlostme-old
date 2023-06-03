'use strict';

const https = require('https');
const colors = require('./colors.js');
const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const UsersManneger = require('./Users.js');
const UsersCookie = require('./UserCookie.js');

const Users = new UsersManneger();
const UsersC = new UsersCookie();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'BAMA2212',
}));

app.use(async (req, res, next) => {
    var loged = 'Sin loguear';
    if(UsersC.has(req.session.id)) {
        loged = `Logeado como: ${UsersC.get(req.session.id).user}`;
    };
    console.log(`${colors.yellow(`Se ha conectado:`)} ${colors.blue(`${req.ip.replace('::ffff:', '')} | ${loged}`)}`);
    next();
});

const PORT = 2212;

app.get('/favicon', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'favicon.png'));
    return;
});

app.get('/', async (req, res) => {
    if(!UsersC.has(req.session.id)) {
        res.redirect('/login');
        return;
    }
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
    return;
});

app.get('/login', async (req, res) => {
    if(UsersC.has(req.session.id)) {
        res.redirect('/');
        return;
    }
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
    return;
});

app.get('/logout', async (req, res) => {
    if(UsersC.has(req.session.id)) {

        UsersC.delete(req.session.id);

        res.redirect('/login');
        return;
    }
    res.send(res.send(JSON.stringify({status: false, reason: "Not loged in"})));
    return;
});

app.post('/login', async (req, res) => {
    if(UsersC.has(req.session.id)) {

        UsersC.delete(req.session.id);

        res.send(JSON.stringify({status: false}));
        return;
    }

    var user = req.body.user;
    var pass = req.body.pass;

    if(Users.has(user)) {
        const u = Users.get(user);
        if(u.user === user && u.pass === pass) {
            UsersC.set(req.session.id, {
                user: user,
                pass: pass,
            });
            res.send(JSON.stringify({status: true}));
            return;
        }
    }
    res.send(JSON.stringify({status: false}));
    return;
});

// FILE MANNEGER
/*
upload:
    post: /api/upload
    query: dir?

mdir:
    post: /api/gdir
    body: dir?

    post: /api/mdir
    body: name, dir?

    delete: /api/mdir
    body: name, dir?

mfile:
    get: /api/mfile
    query: f=name, d=dir?

    get: /api/mfile/download
    query: f=name, d=dir?

    delete: /api/mfile
    body: name, dir?

*/

app.post('/api/upload', async (req, res) => {
    const form = new formidable.IncomingForm({
        multiples: true,
        encoding: 'utf-8',
        uploadDir: path.join(__dirname, 'temp'), // Temp dir ather edit
        maxFileSize: 4000 * 1024 * 1024, // 4GB
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        if(err) console.log(err);
    });

    form.on('fileBegin', async (name, file) => { //NAME = UPLOAD OR NAME IN HTML FOR THE UPLOAD
        console.log(file.name);
    });

    form.on('file', async (name, file) => { //NAME = UPLOAD OR NAME IN HTML FOR THE UPLOAD
        var BasePath = path.join(__dirname, 'files', UsersC.get(req.session.id).user);
        if(req.query.dir && req.query.dir != false) {
            BasePath = path.join(BasePath, '/' + req.query.dir.replace(/\.\.\//g));
        }
        var newPath = path.join(BasePath, file.name);
        fs.rename(file.path, newPath, async (err) => {
            if(err) {
                console.log(err);
                res.send(JSON.stringify({status: false}));
                return;
            }
        });
        res.send(JSON.stringify({status: true}));
        return;
    });
});

app.post('/api/gdir', async (req, res) => {
    if(!UsersC.has(req.session.id)) {
        res.send(JSON.stringify({status: false}));
        return;
    }

    var BasePath = path.join(__dirname, 'files', UsersC.get(req.session.id).user);
    
    if(req.body.dir && req.body.dir != false) {
        BasePath = path.join(BasePath, '/' + req.body.dir.replace(/\.\.\//g));
    }

    var newPath = path.join(BasePath);

    if(!fs.existsSync(newPath)) {
        res.send(JSON.stringify({status: false}));
        return;
    }
    var data = fs.readdirSync(newPath);
    var dirs = [];
    var files = [];
    for(var i = 0; i < data.length; i++) {
        var d = data[i];
        var p = path.join(BasePath, d);
        if(fs.lstatSync(p).isDirectory()) {
            dirs.push(d);
            continue;
        }
        files.push(d);
    }
    res.send(JSON.stringify({status: true, dirs: dirs, files: files}));
    return;
});

app.post('/api/mdir', async (req, res) => {
    if(!UsersC.has(req.session.id)) {
        res.send(JSON.stringify({status: false}));
        return;
    }

    var BasePath = path.join(__dirname, 'files', UsersC.get(req.session.id).user);
    if(req.body.dir && req.body.dir != false) {
        BasePath = path.join(BasePath, '/' + req.body.dir.replace(/\.\.\//g));
    }

    var newPath = path.join(BasePath, req.body.name);

    if(fs.existsSync(newPath)) {
        res.send(JSON.stringify({status: false}));
        return;
    }
    fs.mkdirSync(newPath);
    res.send(JSON.stringify({status: true}));
    return;
});

app.delete('/api/mdir', async (req, res) => {
    if(!UsersC.has(req.session.id)) {
        res.send(JSON.stringify({status: false}));
        return;
    }

    var BasePath = path.join(__dirname, 'files', UsersC.get(req.session.id).user);
    if(req.body.dir && req.body.dir != false) {
        BasePath = path.join(BasePath, '/' + req.body.dir.replace(/\.\.\//g));
    }

    var newPath = path.join(BasePath, req.body.name);

    if(!fs.existsSync(newPath)) {
        res.send(JSON.stringify({status: false}));
        return;
    }
    fs.rmdirSync(newPath, { recursive: true });
    res.send(JSON.stringify({status: true}));
    return;
});

app.get('/api/mfile', async (req, res) => {
    if(!UsersC.has(req.session.id)) {
        res.send(JSON.stringify({status: false}));
        return;
    }

    var BasePath = path.join(__dirname, 'files', UsersC.get(req.session.id).user);
    if(req.query.dir) {
        BasePath = path.join(BasePath, '/' + req.query.dir.replace(/\.\.\//g));
    }
    var newPath = path.join(BasePath, req.query.name);

    if(!fs.existsSync(newPath)) {
        res.send(JSON.stringify({status: false}));
        return;
    }
    res.sendFile(newPath);
    return;
});

app.get('/api/mfile/download', async (req, res) => {
    if(!UsersC.has(req.session.id)) {
        res.send(JSON.stringify({status: false}));
        return;
    }

    var BasePath = path.join(__dirname, 'files', UsersC.get(req.session.id).user);
    if(req.query.dir) {
        BasePath = path.join(BasePath, '/' + req.query.dir.replace(/\.\.\//g));
    }
    var newPath = path.join(BasePath, req.query.name);

    if(!fs.existsSync(newPath)) {
        res.send(JSON.stringify({status: false}));
        return;
    }
    res.download(newPath);
    return;
});

app.delete('/api/mfile', async (req, res) => {
    if(!UsersC.has(req.session.id)) {
        res.send(JSON.stringify({status: false}));
        return;
    }

    var BasePath = path.join(__dirname, 'files', UsersC.get(req.session.id).user);
    if(req.body.dir && req.body.dir != false) {
        BasePath = path.join(BasePath, '/' + req.body.dir.replace(/\.\.\//g));
    }

    var newPath = path.join(BasePath, req.body.name);

    if(!fs.existsSync(newPath)) {
        res.send(JSON.stringify({status: false}));
        return;
    }
    fs.unlinkSync(newPath);
    res.send(JSON.stringify({status: true}));
    return;
});

// https://github.com/sagardere/set-up-SSL-in-nodejs

// https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-16-04

// openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt

// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.crt -days 365

// https://programarivm.com/pon-en-marcha-un-servidor-https-en-node-js-con-express
//https.createServer({
//    key: fs.readFileSync('./ssl/key.key'),
//    cert: fs.readFileSync('./ssl/cert.crt'),
//    passphrase: 'opnetwork'
//}, app)
app.listen(PORT, async () => {
    console.log(`Server start at http://localhost:${PORT} || http://mysql-opnetwork.ddns.net:${PORT}`);
});
