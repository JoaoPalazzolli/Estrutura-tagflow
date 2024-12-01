import { Request, Response } from 'express';
import countService from '../services/CountService';

async function incrementCount (req: Request, res: Response) {
    countService.incrementCount(req, res);
};

export default { incrementCount };