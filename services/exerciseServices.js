import Exercise from '../models/Exercise.js';

export const getAllExercise = filter => Exercise.find(filter);
