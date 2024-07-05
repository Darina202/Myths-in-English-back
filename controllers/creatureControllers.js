import HttpError from '../helpers/HttpError.js';
import { getCreatureById } from '../services/creatureServices.js';
import Creature from '../models/Creature.js';
import { getRandomCreatureService } from '../services/creatureServices.js';

export const getAllCreature = async (req, res) => {
  const { _id: owner } = req.user;
  const baseUrl = req.baseUrl.split('/');
  const ref_mythology = baseUrl[3];
  const data = await getCreatureById({ ref_mythology });
  if (!data) throw HttpError(404, 'Not found');
  res.json(data);
};

export const getRandomCreature = async (req, res) => {
  try {
    const randomCreature = await getRandomCreatureService();
    res.json(randomCreature);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random creature' });
  }
};
