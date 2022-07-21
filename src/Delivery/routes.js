const { Router } = require("express");
// const userRouter = require("../user/routes");
const { createDel, findDel, deleteDel, updateDel, findDels } = require("./controllers");

const delRouter = Router();

delRouter.post("/delivery", createDel);
delRouter.get("/delivery/:name", findDel);
delRouter.delete("/delivery/:name", deleteDel);
delRouter.patch("/delivery", updateDel)
delRouter.get("/deliveries", findDels)

module.exports = delRouter;
