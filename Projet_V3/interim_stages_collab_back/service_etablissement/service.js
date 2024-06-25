const express = require("express");
const cors = require("cors");

const connectDB = require("../database/connectDB");
const { verifyAccessToken } = require("./middlewares/verifyAccessToken");
const moment = require("moment");
const cron = require("node-cron");
const axios = require("axios");

connectDB();

const service = express();
const PORT = 3020;


service.use(cors({ origin: "*" }));
service.use(express.urlencoded({ extended: true }));
service.use(express.json());

service.use((req, res, next) => {
	console.log(`Request received: ${req.method} ${req.url}`);
	next();
});

const registerService = async (serviceName, serviceVersion, servicePort) => {
	try {
		const response = await axios.put(
			`http://localhost:3001/register/${serviceName}/${serviceVersion}/${servicePort}`
		);
		console.log(response.data); // Log the response from the registry service
	} catch (error) {
		console.error("Error registering service:", error);
	}
};
registerService("etablissement", "v1", PORT);


service.listen(PORT, () => {
	console.log(`service running on port ${PORT}`);
});
