import { getAllMyth } from '../services/mythSectionService.js';
import HttpError from '../helpers/HttpError.js';

export const getMyth = async (req, res) => {
  const { _id: owner } = req.user;
  const baseUrl = req.baseUrl.split('/');
  const ref_mythology = baseUrl[3];
  const data = await getAllMyth({ ref_mythology });
  if (!data) throw HttpError(404, 'Not found');
  res.json(data);
};
