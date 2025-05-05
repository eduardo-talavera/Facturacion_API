import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'node:process'

export const connectDB = async () => {
    try {
        const { connection: { host, port } } = await mongoose.connect(process.env.DATABASE_URL!)
        const url = `${host}:${port}`
        console.log(colors.yellow.bold(`MongoDB Conectado en ${url}`))
    } catch (error) {
        //console.log(error.message)
        console.log(colors.red.bold('Error al conectar a MongoDB'))
        exit(1)
    }
}