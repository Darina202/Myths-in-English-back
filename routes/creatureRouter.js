import express from 'express';
import validateAuth from '../middlewares/validateAuth.js';
import { getAllCreature } from '../controllers/creatureControllers.js';

const creatureRouter = express.Router();

creatureRouter.get('/', getAllCreature);

export default creatureRouter;
