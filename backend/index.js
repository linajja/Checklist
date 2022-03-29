import routerGet from './controllers/get.js'
import routerPost from './controllers/post.js'
import routerDelete from './controllers/delete.js'
import routerPut from './controllers/put.js'
import { writeFile, readFile } from 'fs'
import express from 'express'
import cors from 'cors'

const app = express()
const database = 'database.json'

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

<<<<<<< HEAD
app.use('/', routerGet)
app.use('/', routerPost)
app.use('/', routerDelete)
app.use('/', routerPut)
=======
app.get('/', (req, res) => {

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
        } else {
            data = JSON.parse(data)
            res.json({ status: 'success', data })
        }
    })

})

app.get('/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
        } else {
            data = JSON.parse(data)

            const jsonId = data.findIndex((el) => el.id == id)

            if (jsonId === -1) {
                res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
                return
            }

            res.json({ status: 'success', data: data[jsonId] })
        }
    })

})

app.post('/add-todo', (req, res) => {
    let task = req.body.task

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }

        let json = JSON.parse(data)
        let id = json.length > 0 ? json[json.length - 1].id + 1 : 0;

        //Alternatyva auksciau pazymetai eilutei
        // if(json.length > 0)
        //     id = json[json.length - 1].id + 1

        json.push({ id, task, done: false })

        writeFile(database, JSON.stringify(json), 'utf8', err => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Duomenys sėkmingai įrašyti' })
            }
        })

    })
})

app.delete('/delete-todo/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }
        //Issifruojame json informacija atgal i javascript masyva
        let json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
            return
        }

        json.splice(jsonId, 1)

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Įrašas sėkmingai ištrintas' })
            }
        })

    })
})

app.delete('/mass-delete', (req, res) => {
    let ids = req.body.ids

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }

        let json = JSON.parse(data)
        let dataArray = []
        json.forEach((value, index) => {
            if (!ids.includes(value.id.toString())) {
                dataArray.push(value)
            }
        })

        //console.log(json)

        let jsonString = JSON.stringify(dataArray)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Įrašas sėkmingai ištrintas' })
            }
        })

    })

})

app.put('/mark-done/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }
        //Issifruojame json informacija atgal i javascript masyva
        let json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
            return
        }

        json[jsonId].done = json[jsonId].done ? false : true

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Užduotis atlikta' })
            }
        })

    })
})
>>>>>>> dd91d4c6c6f7e503a724166b4b015b57db69456f

app.put('/edit-todo/:id', (req, res) => {
    let id = req.params.id
    let task = req.body.task

    if (task === undefined) {
        res.json({ status: 'failed', message: 'Neįvesta jokia reikšmė' })
        return
    }

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
            return
        }
        //Issifruojame json informacija atgal i javascript masyva
        let json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
            return
        }

        json[jsonId].task = task

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
            } else {
                res.json({ status: 'success', message: 'Įrašas sėkmingai atnaujintas' })
            }
        })

    })
})

app.listen(5001, () => {
    console.log('Serveris veikia')
})