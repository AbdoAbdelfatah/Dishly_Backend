import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Offer title is required"],
      trim: true,
    },
    description: { type: String, trim: true },
    discountPercent: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    menuItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

offerSchema.index({ validUntil: 1, isActive: 1 });

export default mongoose.models.Offer || mongoose.model("Offer", offerSchema);
