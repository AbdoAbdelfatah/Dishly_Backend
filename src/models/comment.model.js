import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        menuItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem",
        },
        content: {
            type: String,
            required: [true, "Comment content is required"],
            trim: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "Rating is required"],
        },
    },
    {timestamps: true}
);


export default mongoose.models.Comment ||
    mongoose.model("Comment", commentSchema);