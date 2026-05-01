import express from 'express'
import type {Express} from 'express'
import dotenv from 'dotenv'

const app:Express=express()
dotenv.config()


app.listen(process.env.PORT,()=>console.log(`Server listening on port ${process.env.PORT}`))
