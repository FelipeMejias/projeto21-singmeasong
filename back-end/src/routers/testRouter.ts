import { Router } from "express";
import { testController } from "../controllers/testController.js";

const testRouter = Router();

testRouter.delete("/reset", testController.deleteAll);
testRouter.get("/find/:name", testController.findByName);

export default testRouter;