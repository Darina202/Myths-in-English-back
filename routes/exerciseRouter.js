import express from 'express';
import validateAuth from '../middlewares/validateAuth.js';
import { getMythology } from '../controllers/mythologyControllers.js';

const exerciseRouter = express.Router();

exerciseRouter.use(validateAuth);

exerciseRouter.get('/', getMythology);

export default exerciseRouter;
