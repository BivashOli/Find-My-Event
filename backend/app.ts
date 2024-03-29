import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/UserRoutes'
import eventRoutes from './routes/EventRoutes'
import dotenv from 'dotenv'
import authentication from './middleware/Authentication'
import authorization from './middleware/UserAuthorization'

//config dotenv file
dotenv.config({ path: '.env.local' })

// create express app
const app: express.Express = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middleware
app.use(authentication)
// set routes
app.use(userRoutes)
app.use(eventRoutes)

// connect to MongoDB atlas
const dbURI: string | undefined = process.env.DB_URI
if (dbURI == undefined) {
     console.log("ERROR: DB URI is not assigned in env file")
} else {
     mongoose.connect(dbURI).then(
          (result) => {
               console.log('connected to db')
          }
     ).catch((err: any) => console.log(err))
}

// home page
app.get("/", (req: Request, res: Response) => {
     res.send("<h1>HOME</h1>")
})

export default app 
