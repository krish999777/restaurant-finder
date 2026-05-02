import express from 'express'
import type {Express} from 'express'
import dotenv from 'dotenv'
import db from './config/db'

const app:Express=express()
dotenv.config()
app.use(express.json())
async function startServer():Promise<void> {
  try {
    await db();
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}
startServer()