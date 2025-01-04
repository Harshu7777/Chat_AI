const mongoose = require('mongoose');

const connectDB = async(req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected Successfull');
    } catch (error) {
        console.log(error);
        process.exit(1);
     }
}

module.exports = connectDB;

