const mongoose = require("mongoose");
const url = process.env.MONGO_DB_URL;

const connectDB = async() => {
    try {
        await mongoose.connect(url);
        console.log(`MongoDB Connected Successfully`);
    } catch (err) {
        console.log("MongoDB Connection Failed", err)
    }
}

module.exports = connectDB;