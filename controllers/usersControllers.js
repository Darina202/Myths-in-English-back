import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError.js';
import { singUp, findUser, updateUser } from '../services/usersServices.js';
import 'dotenv/config';
import gravatar from 'gravatar';
import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';
import cloudinary from '../helpers/cloudinary.js';

const { SECRET_KEY } = process.env;
const avatarPath = path.resolve('public', 'avatars');

export const singup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userEmail = await findUser({ email });
    if (userEmail) {
      throw HttpError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);
    const newUser = await singUp({
      ...req.body,
      password: hashPassword,
      avatarURL: avatarUrl,
    });
    const payload = { email: newUser.email, id: newUser._id };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '24h',
    });
    await updateUser({ _id: newUser._id }, { token });
    res.status(201).json({
      token,
      user: { email: newUser.email, username: newUser.username },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userEmail = await findUser({ email });
    if (!userEmail) {
      throw HttpError(401, 'Email or password is wrong');
    }
    const passwordCompare = await bcrypt.compare(password, userEmail.password);
    if (!passwordCompare) {
      throw HttpError(401, 'Email or password is wrong');
    }
    const token = jwt.sign({ id: userEmail._id }, SECRET_KEY, {
      expiresIn: '24h',
    });
    await updateUser({ _id: userEmail._id }, { token });
    res.json({
      token,
      user: { email, username: userEmail.username },
    });
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res) => {
  const { username, email } = req.user;
  res.json({
    username,
    email,
  });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await updateUser({ _id }, { token: '' });
  res.status(204).send();
};

export const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    throw HttpError(400, 'File not found');
  }

  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join('avatars', filename);

  const image = await Jimp.read(newPath);
  await image.resize(250, 250).writeAsync(newPath);

  const result = await updateUser({ _id }, { ...req.body, avatarURL: avatar });

  res.status(200).json({
    user: { email: result.email, username: result.username, ...result },
  });
};

export const editProfile = async (req, res) => {
  const { username, email } = req.body;

  const {
    _id,
    avatar_id: oldAvatarId,
    email: emailUser,
    username: nameUser,
  } = req.user;

  const user = await findUser({ email });
  if (user && !req.file) {
    throw HttpError(409, 'Email in use');
  }

  if (user) {
    await fs.unlink(req.file.path);
    throw HttpError(409, 'Email in use');
  }

  const updateName = username ? username : nameUser;
  const updateEmail = email ? email : emailUser;

  if (!req.file) {
    const result = await updateUser(
      { _id },
      { username: updateName, email: updateEmail }
    );
    res.status(201).json(result);
    return;
  }
  const { secure_url: avatarURL, public_id: avatar_id } =
    await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      width: 220,
      height: 220,
      crop: 'fill',
      gravity: 'auto',
    });
  req.avatar = avatar_id;
  const result = await updateUser(
    { _id },
    {
      avatarURL,
      avatar_id,
      username: updateName,
      email: updateEmail,
    }
  );

  const previousAvatarURL = oldAvatarId;
  await cloudinary.api.delete_resources(previousAvatarURL);
  await fs.unlink(req.file.path);

  res.json(result);
};
