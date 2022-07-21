const { Router } = require("express");
const { addListing, listings, updateListing } = require("./controllers");

const listingRouter = Router();

listingRouter.post("/sell", addListing);
listingRouter.get("/shop", listings);
listingRouter.patch("/edit", updateListing);

module.exports = listingRouter;
