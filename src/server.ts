import express from 'express'
import { routes } from './routes'
import cors from 'cors'
import { env } from 'process'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(parseInt(process.env.PORT || "3000"), () => console.log("server runing"))
