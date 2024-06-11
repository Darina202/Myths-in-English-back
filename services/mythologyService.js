import Mythology from '../models/Mythology.js';

export const getAllMythology = filter => Mythology.find(filter);
