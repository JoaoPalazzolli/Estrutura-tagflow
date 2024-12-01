import { Request, Response } from 'express';
import tagService from '../services/TagService';

async function findByAgent(req: Request, res: Response) {
    return tagService.findByAgent(req, res);
};

async function createTag (req: Request, res: Response) {
   tagService.createTag(req, res);
};

export default { findByAgent, createTag }