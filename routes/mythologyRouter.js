import express from 'express';
import { getMythology } from '../controllers/mythologyControllers.js';
import validateAuth from '../middlewares/validateAuth.js';
import { getRandomCreature } from '../controllers/creatureControllers.js';

const mythologyRouter = express.Router();

mythologyRouter.use(validateAuth);

mythologyRouter.get('/', getMythology);

mythologyRouter.get('/random', getRandomCreature);

export default mythologyRouter;
