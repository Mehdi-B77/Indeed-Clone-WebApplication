const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		const DB_URL = 'mongodb+srv://TER_BD:TER_BD123@projetterstagedb.ripeeot.mongodb.net/';

		await mongoose.connect(DB_URL);

		console.log("Connected to MongoDB!");
	} catch (error) {
		console.error("Connection to MongoDB failed:", error);
	}
};

module.exports = connectDB;
