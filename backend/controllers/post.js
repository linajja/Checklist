import express, { application } from 'express'
import { writeFile, readFile } from 'fs'
import { database } from '../config/index.js'


const routerPost = express.Router()


routerPost.post('/add-todo', (req, res) => {
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

export default routerPost