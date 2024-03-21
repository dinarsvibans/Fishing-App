import mongoose, { Schema, models } from 'mongoose';


interface IUser extends Document {
  _id:string;
  name: string;
  surname: string;
  email: string;
  password: string;
  // Add other properties as needed
}

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
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);

export default User
