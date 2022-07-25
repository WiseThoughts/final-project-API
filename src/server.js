require("./db/connection.js"); // Require connection details for database
const express = require("express"); // Require Express module to create web server
const cors = require("cors"); // Require Cross-Origin-Resource-Sharing to provide the API with access to the API

const userRouter = require("./user/routes"); // Require the userRouter to allow front-end to interact with user documents
const delRouter = require("./Delivery/routes"); // Require the delRouter to allow front-end to interact with delivery documents
const listingRouter = require("./listings/routes"); // Require the listingRouter to allow front-end to interact with listing documents

const app = express(); // Create web server constant to manipulate
const port = process.env.PORT || 5001; // Store supplied port or default

app.use(express.json()); // Parses all requests made if they are JSON, and sends all responses as JSON

app.use(cors()); // Allows requests to be made from other Node applications of any origin

app.use(userRouter); // Gives access to user documents
app.use(delRouter); // Gives access to delivery documents
app.use(listingRouter); // Gives access to listing documents

// Listening on provided port on current location (localhost)
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
