import express from 'express';
import {
  singup,
  signin,
  currentUser,
  logout,
  editProfile,
} from '../controllers/usersControllers.js';
import { userSignUpSchema, userSignInSchema } from '../schemas/usersSchemas.js';
import validateBody from '../helpers/validateBody.js';
import validateAuth from '../middlewares/validateAuth.js';
import upload from '../middlewares/upload.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(userSignUpSchema), singup);

authRouter.post('/login', validateBody(userSignInSchema), signin);

authRouter.get('/current', validateAuth, currentUser);

authRouter.post('/logout', validateAuth, logout);

authRouter.patch(
  '/edit-profile',
  validateAuth,
  upload.single('avatar'),
  editProfile
);

export default authRouter;
