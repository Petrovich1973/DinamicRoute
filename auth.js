const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const jwt = require('jsonwebtoken')

const port = 4300
const secret = 'secretKey'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const adapter = new FileAsync('db.json')
low(adapter)
    .then(db => {

        app.get("/ping", (req, res) => {
            setTimeout(() => res.json({ "msg": "pong" }), 2000)
        })

        // login
        app.post('/login', async (req, res) => {

            const {login = null, password = null} = req.body

            if(login && password) {
                const user = await db.get('users')
                    .find({ login, password })
                    .value()

                if(user) {
                    const token = jwt.sign({ login, password }, secret)
                    res.send({user, token})
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(400)
            }
        })

        // roles
        app.get('/roles', (req, res) => {
            const result = db.get('roles')

            res.send(result)
        })

        // users
        app.get('/users', (req, res) => {
            const result = db.get('users')

            res.send(result)
        })

        app.get('/users/:name', (req, res) => {
            const result = db.get('users')
                .find({ name: req.params.name })
                .value()

            res.send(result)
        })

        app.post('/users', (req, res) => {
            db.get('users')
                .push(req.body)
                .last()
                .assign({ id: Date.now().toString() })
                .write()
                .then(result => res.send(result))
        })

        app.put('/users/:name', (req, res) => {
            db.get('users')
                .find({ name: req.params.name })
                .assign({...req.body})
                .write()
                .then(result => res.send(result))
        })

        // return db.defaults({ clusters: [], topics: [] }).write()
    })
    .then(() => {
        app.listen(port, () => console.log(`Server starting on port: ${port}`))
    })

// Auth middleware
app.use((req, res, next) => {
    // login does not require jwt verification
    if (req.path === '/login') {
        // next middleware
        return next()
    }

    // get token from request header Authorization
    const token = req.headers.authorization

    // Token verification
    try {
        const decoded = jwt.verify(token, secret);
        console.log("decoded", decoded)
    } catch (err) {
        // Catch the JWT Expired or Invalid errors
        return res.status(401).json({ "message": err.message })
    }

    // next middleware
    next()
});