import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
    },
    description: { type: String, trim: true },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    category: {
      type: String,
      enum: ["meal", "appetizer", "dessert", "drink"],
      required: true,
    },
    rate:{
      type: Number,
      min:0,
      max:5,
      default:0
    },
    isAvailable: { type: Boolean, default: true },
    imagesUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

menuItemSchema.index({ category: 1 });

export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", menuItemSchema);
