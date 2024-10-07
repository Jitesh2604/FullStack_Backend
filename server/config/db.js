const mongoose = require("mongoose");
const url = process.env.MONGO_DB_URL;

const connectDB = async() => {
    try {
        await mongoose.connect(url,
            {
                family:4,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000, // 30 seconds timeout
                socketTimeoutMS: 45000, // 45 seconds for socket inactivity timeout
            });
        console.log(`MongoDB Connected Successfully`);
    } catch (err) {
        console.log("MongoDB Connection Failed", err)
    }
}

module.exports = connectDB;
