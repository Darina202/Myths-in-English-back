import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    avatar_id: {
      type: String,
      default: null,
    },
    learnedWord: { type: Number, default: null },
    achievementURL: [
      {
        type: String,
        default: null,
      },
    ],
    langSetting: {
      profLang: {
        type: String,
        default: 'English',
      },
      nativeLang: {
        type: String,
        default: 'Українська',
      },
    },
    remind: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSetting);

userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
