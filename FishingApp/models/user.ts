import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fishes: [{
      fishName: {
        type: String,
        required: true,
      },
      fishLength: {
        type: String,
        required: true,
      },
      fishWeight: {
        type: String,
        required: true,
      },
      fishingRodName: {
        type: String,
        required: true,
      },
      fishingRodLength: {
        type: String,
        required: true,
      },
      fishingRodTest: {
        type: String,
        required: true,
      },
      biteName: {
        type: String,
        required: true,
      },
      fishingLineType: {
        type: String,
        required: true,
      },
      photo:{
        type: String,
        required: true,
      }
    }],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);
export default User;
