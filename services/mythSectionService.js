import MythSection from '../models/MythSection.js';

export const getAllMyth = filter => MythSection.find(filter);
