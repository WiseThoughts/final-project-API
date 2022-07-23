require("./db/connection.js")
const express = require("express"); 
const cors = require("cors");
const userRouter = require("./user/routes");
const delRouter = require("./Delivery/routes")
const listingRouter = require("./listings/routes");
const app = express();
const port = process.env.PORT || 5001;


app.use(express.json());

app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "DELETE", "PATCH", "PUT"]
}));
app.use(userRouter);
app.use(delRouter);

app.use(listingRouter);

app.listen(port, ()=>{
	console.log(`listening on port ${port}`);
}); 
