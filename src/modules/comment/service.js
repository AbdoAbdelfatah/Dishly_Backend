import commentModel from "../../models/comment.model.js";
import { ErrorClass } from "../../utils/error.util.js";

export class CommentService {
    async createComment(commentData) {
        try {
            const comment = new commentModel(commentData);
            await comment.save();
            return comment;
        } catch (error) {
            throw new ErrorClass('Failed to create comment', 500, error.message, 'CommentService.createComment');
        }
    }
    async getCommentsByMenuItem(menuItemId) {
        try {
            const comments = await commentModel.find({ menuItem: menuItemId }).lean();
            return comments;
        }
        catch (error) {
            throw new ErrorClass('Failed to get comments by menu item', 500, error.message, 'CommentService.getCommentsByMenuItem');
        }
    }
}
