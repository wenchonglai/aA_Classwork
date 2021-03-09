class CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    @comment.post_id = params[:post_id]

    if @comment.save
      if @comment.parent_comment_id == nil
        redirect_to post_url(@comment.post_id) 
      else
        redirect_to comment_url(@comment.ancestor_id)
      end
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new
    end
  end

  def index
    @post = Post.find_by(id: params[:post_id])
    if @post
      @comment_hash = @post.comments_by_parent_id
      render :index
    else
      
    end

  end

  # def show
  #   @comment = Comment.find_by(id: params[:id])
  #   render :show
  # end

  private
  def comment_params
    params.require(:comment).permit(:content, :parent_comment_id)
  end
end

