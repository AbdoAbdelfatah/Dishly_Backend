import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Branch name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Branch location is required"],
    },
    phone: {
      type: String,
      match: [/^\+?\d{10,15}$/, "Invalid phone number"],
    },
    openingHours: {
      type: String,
      default: "09:00 AM - 11:00 PM",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Branch ||  mongoose.model("Branch", branchSchema);
