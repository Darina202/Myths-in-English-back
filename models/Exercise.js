import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const exerciseSchema = new Schema(
  {
    exercise_theme: {
      type: String,
    },
    image: { type: String },
    description: {
      type: String,
      default: null,
    },
    group: { type: String },
    test: [
      {
        title: { type: String, required: true },
        variants: [
          { title: { type: String, required: true }, flag: { type: Boolean } },
        ],
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

exerciseSchema.post('save', handleSaveError);

exerciseSchema.pre('findOneAndUpdate', setUpdateSetting);

exerciseSchema.post('findOneAndUpdate', handleSaveError);

const Exercise = model('exercise', mythologySchema);

export default Exercise;
