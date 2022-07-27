require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const heroRouter = require('./routes/hero.router');
const planetRouter = require('./routes/planet.router');
const jwt = require('jsonwebtoken');
const app = express();
const auth = require('./auth');
const PORT = process.env.port;

mongoose.connect(process.env.DB_CONNECTION)
.then((res) => console.log('Connected to database'))
.then((res) => app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}))
.catch((err) => console.log(err));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Planets and Heroes API',
            description: 'Planets and Heroes API Information',
            contact: {
                name: 'John'
            },
            servers: ['https://localhost:5000']
        }
    },
    apis: ["index.js"]
};
/**
 * @swagger
 * /planets:
 *  get:
 *      description: Use to get a list of all planets
 *      responses:
 *          '200':
 *              description: Success
 */
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors({
    origin: '*'
}))

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`Method: ${req.method}\nUrl: ${req.baseUrl}${req.url}\nTime: ${delta}ms\n`);
});
app.use(express.json());

app.get('/login', (req, res) => {
    User.findOne({name: req.body.name, password: req.body.name});
    then((result => {
        const userobj = {name: req.body.name};
        const token = jwt.sign(userobj, process.env.SECRET_TOKEN);
        res.json({acessToken: token});
    })).catch((err) => {res.send(err)})
});

app.get('/', (req, res) => { res.send('Welcome to my web server'); });
app.get('/picture',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'grenoble.jpg'));
});
app.get('/messages', auth, (req, res) => {
    res.send('<h1>Messages</h1><ul><li>Hello 1</li><li>Hello 2</li></ul>');
});
app.use('/planets', planetRouter);
app.use('/heroes', heroRouter);