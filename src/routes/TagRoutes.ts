import { Router } from "express";
import TagController from "../controller/TagController";

const router = Router();

router.get("/api/v1/tag/:agent", TagController.findByAgent);
router.post("/api/v1/tag", TagController.createTag);

export default router;