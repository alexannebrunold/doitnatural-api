import express from 'express'
// import { json } from 'express'
// const expresss = express
const app = express()
import apiRoutes from './routes/routes.js'
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
app.use(cors())

app.use(express.json())

app.use('/', apiRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
