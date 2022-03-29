import express, { application } from 'express'
import { writeFile, readFile } from 'fs'
import { database } from '../config/index.js'


const routerDelete = express.Router()

routerDelete.delete('/delete-todo/:id', (req, res) => {
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

routerDelete.delete('/mass-delete', (req, res) => {
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


export default routerDelete