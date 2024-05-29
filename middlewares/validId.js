import { isValidObjectId } from 'mongoose';
import HttpError from '../helpers/HttpError.js';

const validId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(400, `${id} isn't valid id`));
  }
  next();
};
export default validId;
