import { getAllMythology } from '../services/mythologyService.js';
import HttpError from '../helpers/HttpError.js';

export const getMythology = async (req, res, next) => {
  // const { _id: owner } = req.user;
  // const { id } = req.params;
  // console.log(req.params);
  try {
    const result = await getAllMythology();

    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
