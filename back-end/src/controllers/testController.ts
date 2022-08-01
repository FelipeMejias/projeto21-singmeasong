import { Request, Response } from "express";
import { testService } from "../services/testService.js";

async function deleteAll(req: Request, res: Response) {
    await testService.deleteAll()
    res.sendStatus(200)
}

async function findByName(req: Request, res: Response) {
    const {name}=req.params
    const video=await testService.findByName(name)
    res.status(200).send(video)
}
  
export const testController={
    deleteAll,findByName
}