import express, { application } from 'express'
import { writeFile, readFile } from 'fs'
import { database } from '../config/index.js'

const routerPut = express.Router()


routerPut.put('/mark-done/:id', (req, res) => {
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

routerPut.put('/edit-todo/:id', (req, res) => {
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

export default routerPut