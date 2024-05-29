import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const mythSectionSchema = new Schema(
  {
    myth_name: {
      type: String,
    },
    image: { type: String },
    ref_mythology: {
      type: Schema.Types.ObjectId,
      ref: 'mythology',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

mythSectionSchema.post('save', handleSaveError);

mythSectionSchema.pre('findOneAndUpdate', setUpdateSetting);

mythSectionSchema.post('findOneAndUpdate', handleSaveError);

const MythSection = model('myth', mythSectionSchema);

export default MythSection;
