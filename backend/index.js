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


app.use('/', routerGet)
app.use('/', routerPost)
app.use('/', routerDelete)
app.use('/', routerPut)

app.listen(5001, () => {
    console.log('Serveris veikia')
})