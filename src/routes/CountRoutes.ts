import { Router } from "express";
import CountController from "../controller/CountController";

const router = Router();

router.put("/api/v1/count/tag", CountController.incrementCount);

export default router;