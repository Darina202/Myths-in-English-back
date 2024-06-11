import express from 'express';
import { getMythology } from '../controllers/mythologyControllers.js';
import validateAuth from '../middlewares/validateAuth.js';

const mythologyRouter = express.Router();

mythologyRouter.use(validateAuth);

mythologyRouter.get('/', getMythology);

export default mythologyRouter;
