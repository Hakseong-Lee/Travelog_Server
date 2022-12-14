import { commentModel } from '../db/index.js';

class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async getComments() {
    const comments = await this.commentModel.findAll();
    return comments;
  }

  async addComment(commentInfo) {
    const createdComment = await this.commentModel.create(commentInfo);
    return createdComment;
  }

  async getCommentById(commentId) {
    const comments = await this.commentModel.findById(commentId);
    return comments;
  }

  async getCommentsByPostId(postId) {
    const comments = await this.commentModel.findByPostId(postId);
    return comments;
  }

  async delComment(commentId) {
    const count = await this.commentModel.deleteOne(commentId);
    return count;
  }

  //   async getBookmarkFolders(userId) {
  //     const folders = await this.bookmarkModel.findFoldersByUserId(userId);
  //     return folders;
  //   }

  //   async getBookmarksByUserId(userId) {
  //     const bookmarks = await this.bookmarkModel.findByUserId(userId);
  //     return bookmarks;
  //   }

  //   async getBookmarksByFolder(userId, bookmarkName) {
  //     const bookmarks = await this.bookmarkModel.findByFolder(
  //       userId,
  //       bookmarkName
  //     );
  //     return bookmarks;
  //   }

  //   async delBookmarks(userId, bookmarkIds) {
  //     const count = await this.bookmarkModel.deleteById({
  //       userId,
  //       bookmarkIds,
  //     });
  //     return count;
  //   }

  //   async updateFolderName(userId, bookmarkName, newBookmarkName) {
  //     const count = await this.bookmarkModel.updateFolderName({
  //       userId,
  //       bookmarkName,
  //       newBookmarkName,
  //     });
  //     return count;
  //   }

  //   async updateBookmarkMemo(userId, id, bookmarkMemo) {
  //     try {
  //       const bookmarks = await this.bookmarkModel.isMyBookmark({
  //         userId,
  //         id,
  //       });
  //       if (bookmarks) {
  //         const count = await this.bookmarkModel.updateBookmarkMemo({
  //           id,
  //           bookmarkMemo,
  //         });
  //         return count;
  //       }
  //       return bookmarks;
  //     } catch (error) {
  //       console.log(error);
  //       return '?????? ???????????? ???????????? ????????? ?????? ????????? ????????????.';
  //     }
  //   }
}

const commentService = new CommentService(commentModel);

export { commentService };
