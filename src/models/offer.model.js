import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Offer title is required"],
      trim: true,
    },
    imageUrl: { type: String, trim: true }, 
    description: { type: String, trim: true },
    discountPercent: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    menuItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

offerSchema.index({ validUntil: 1, isActive: 1 });

export default mongoose.models.Offer || mongoose.model("Offer", offerSchema);
