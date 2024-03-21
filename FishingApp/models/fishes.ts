import mongoose, { Schema, models } from 'mongoose';

const fishSchema = new Schema(
    {
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
      },
      fishingRodName: {
        type: String,
      },
      fishingRodLength: {
        type: String,
      },
      fishingRodTest: {
        type: String,
      },
      biteName: {
        type: String,
      },
      fishingLineType: {
        type: String,
      },
      photo: {
        type: String,
        required: true,
      },
      user:{
        type: String,
        required: true,
      },
      fisherManName:{
        type: String,
      }
    },
    { timestamps: true }
  );

  const Fish = models.Fish || mongoose.model('Fish', fishSchema);

  export default Fish