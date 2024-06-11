import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const creatureSchema = new Schema(
  {
    creature_name: {
      type: String,
    },
    image: { type: String },
    picture: { type: String },
    description: [
      {
        eng_desc: String,
        ua_desc: String,
      },
    ],
    test: [
      {
        title: { type: String, required: true },
        variants: [
          { title: { type: String, required: true }, flag: { type: Boolean } },
        ],
      },
    ],
    ref_myth: {
      type: Schema.Types.ObjectId,
      ref: 'myth',
      required: true,
    },
    ref_mythology: {
      type: Schema.Types.ObjectId,
      ref: 'mythology',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

creatureSchema.post('save', handleSaveError);

creatureSchema.pre('findOneAndUpdate', setUpdateSetting);

creatureSchema.post('findOneAndUpdate', handleSaveError);

const Creature = model('creature', creatureSchema);

export default Creature;
