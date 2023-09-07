import mongoose from 'mongoose'

const connectDB = async (): void => {
  try {
    const conn = await mongoose.connect(String(process.env.MONGO_URI))
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
