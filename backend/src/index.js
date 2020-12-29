const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const lodash = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const UserModel = require('./models/User');
const ProductModel = require('./models/Product');

const SECRET_KEY = 'tshirtStore';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

function authMiddleware(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err && !user) return res.sendStatus(403)
        delete user.iat;
        delete user.password;
        req.user = user;
        next() // pass the execution off to whatever request the client intended
    })
}

function generateAccessToken(user) {
    delete user.password;
    return jwt.sign(JSON.parse(JSON.stringify(user)), SECRET_KEY);
}

// AUTH ROUTES
app.post('/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    const user = UserModel.create({ name, email, password });
    const token = generateAccessToken(user);
    return res.send({ user, token });
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = lodash.find(UserModel.all(), { email });

    if (bcrypt.compareSync(password, user.password)) {
        const token = generateAccessToken(user);
        return res.send({ user, token })
    }

    return res.status(500).send('Email or password incorrent');
});

// Crud Product

app.get('/product/all', (req, res) => {
    const posts = ProductModel.all().reverse();
    return res.send(posts);
});

app.get('/product', authMiddleware, (req, res) => {
    const posts = lodash.filter(ProductModel.all(), { user: req.user });
    return res.send(posts);
});

app.get('/product/:id', (req, res) => {
    const post = ProductModel.find(req.params.id);
    if (!post) return res.status(404).send({ message: 'Not found product with id' });
    return res.send(post);
});


// function for uplaod image with express
const upload = multer({
    storage: multer.diskStorage({
        destination: __dirname + '/images',
        filename: function (req, file, cb) {
            cb(null, uuid() + path.extname(file.originalname)); // create randon name
        }
    })
}).single('image');

app.post('/product/', authMiddleware, (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(500).send(err);

        const payload = req.body;
        payload.image = req.file ? 'http://localhost:3333/images/' + req.file.filename : '';
        payload.user = req.user;
        payload.created_at = new Date().toISOString().slice(0, 10);
        const post = ProductModel.create(payload);
        return res.send(post);
    });
});

app.put('/product/:id', authMiddleware, (req, res) => {
    const post = ProductModel.find(req.params.id);
    if (!post) return res.status(404).send({ message: 'Not found product with id' });

    const updated = ProductModel.update(post.id, req.body);
    return res.send(updated);
});

app.delete('/product/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    const post = ProductModel.delete(id);
    fs
    return res.send(post);
});

app.use(express.static(__dirname)); // get images static from server;

const port = 3333;
app.listen(port, () => console.log(`Server started on port ${port}`));