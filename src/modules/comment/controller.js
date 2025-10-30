import { CommentService } from "./service.js";
const commentService = new CommentService();

export class CommentController {
    async createComment(req, res) {
        try {
            const commentData = req.body;
            const comment = await commentService.createComment(commentData);
            res.status(201).json(comment);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async getCommentsByMenuItem(req, res) {
        try {
            const menuItemId = req.params.menuItemId;
            const comments = await commentService.getCommentsByMenuItem(menuItemId);
            res.status(200).json(comments);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}
