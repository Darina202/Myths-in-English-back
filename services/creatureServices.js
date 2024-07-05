import Creature from '../models/Creature.js';

export const getCreatureById = filter => Creature.find(filter);

export const getRandomCreatureService = async () => {
  const count = await Creature.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  return await Creature.findOne().skip(randomIndex);
};
