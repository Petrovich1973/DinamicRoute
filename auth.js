const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const port = 4300

const app = express()
app.use(bodyParser.json())

const adapter = new FileAsync('db.json')
low(adapter)
    .then(db => {

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