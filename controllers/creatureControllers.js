import HttpError from '../helpers/HttpError.js';
import { getCreatureById } from '../services/creatureServices.js';

export const getAllCreature = async (req, res) => {
  const { _id: owner } = req.user;
  const baseUrl = req.baseUrl.split('/');
  const ref_mythology = baseUrl[3];
  const data = await getCreatureById({ ref_mythology });
  if (!data) throw HttpError(404, 'Not found');
  res.json(data);
};

export const getCardById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const data = await getCreatureById({ owner, _id: id });
  if (!data) throw HttpError(404, 'Not found');
  res.json(data);
};
