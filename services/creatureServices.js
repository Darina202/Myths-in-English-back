import Creature from '../models/Creature.js';

export const getCreatureById = filter => Creature.find(filter);
