import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const mythologySchema = new Schema(
  {
    mythology_name: {
      type: String,
    },
    image: { type: String },
  },
  { versionKey: false, timestamps: true }
);

mythologySchema.post('save', handleSaveError);

mythologySchema.pre('findOneAndUpdate', setUpdateSetting);

mythologySchema.post('findOneAndUpdate', handleSaveError);

const Mythology = model('mythology', mythologySchema);

export default Mythology;
