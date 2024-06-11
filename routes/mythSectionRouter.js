import express from 'express';
import validateAuth from '../middlewares/validateAuth.js';
import { getMyth } from '../controllers/mythSectionControllers.js';

const mythSectionRouter = express.Router();

mythSectionRouter.use(validateAuth);

mythSectionRouter.get('/', getMyth);

export default mythSectionRouter;
