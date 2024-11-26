import { Router, Request, Response } from 'express';
import tagService from '../services/TagService';

const router = Router();

router.get("/api/v1/tag/:agent", async (req: Request, res: Response) => {
    tagService.findByAgent(req, res);
});

router.post("/api/v1/tag", async (req: Request, res: Response) => {
   tagService.createTag(req, res);
});

export default router;