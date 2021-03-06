import hashHelper from '../helpers/Hash';
import Response from '../helpers/Response';
import Comment from '../database/models/comments';
import CommentReply from '../database/models/commentReply';
import Product from '../database/models/product';
import Mailer from '../config/Mailer';

class Comments {
  static async create(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId } = payload;

      const { productId } = req.params;

      const newComment = new Comment({
        ...req.body,
        userId,
        productId,
      });
      const comment = await newComment.save();

      if (!comment) {
        const response = new Response(false, 400, 'Something went wrong');
        return res.status(response.code).json(response);
      }

      const response = new Response(
        true,
        201,
        'Comment posted successfully',
        comment
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async getAllCommentInProduct(req, res) {
    try {
      const { productId } = req.params;

      const comments = await Comment.find({ productId })
        .populate({
          path: 'productId',
          select: 'id name description',
        })
        .populate({
          path: 'commentReplies',
        });

      if (!comments.length) {
        const response = new Response(false, 400, 'No product found');
        return res.status(response.code).json(response);
      }

      const response = new Response(
        true,
        200,
        'Successfully retreived',
        comments
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async createCommentReply(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId, email: sendEmail } = payload;

      const { commentId } = req.params;
      const newCommentReply = new CommentReply({
        ...req.body,
        userId,
        commentId,
      });
      const commentReply = await newCommentReply.save();

      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId },
        {
          $push: { commentReplies: commentReply._id },
        },
        { new: true }
      );
      await updatedComment.save();

      if (!commentReply) {
        const response = new Response(false, 400, 'Something went wrong');
        return res.status(response.code).json(response);
      }

      const findComment = await Comment.findOne({ _id: commentId });
      const { productId } = findComment;

      const product = await Product.findOne({ _id: productId }).populate({
        path: 'userId',
        select: 'firstName lastName email id status',
      });

      console.log(product);

      const { userId: receiver } = product;
      const { firstName, lastName, email } = receiver;

      const subject = 'Notification';
      const emailBody = `
      <h3 class="username">Hello ${firstName},</h3>
      <p class="message">
      ${sendEmail} replied to your comment on SPMA
      </p>
      <br/>`;
      Mailer.sendMail(email, subject, emailBody);

      const response = new Response(
        true,
        201,
        'Comment posted successfully',
        commentReply
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }
}

export default Comments;
