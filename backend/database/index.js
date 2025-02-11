const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectToDB = async () => {
    try {

        mongoose.connect(`mongodb+srv://avish:avish00@cluster0.ya8if.mongodb.net/avish`)
        console.log(`Connection to MongoDB successful`)

    } catch (error) {
        console.log(`Connection to MongoDB failed -> ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectToDB 