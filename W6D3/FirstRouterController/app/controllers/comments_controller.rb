class CommentsController < ApplicationController
  def index
    # retrieve EITHER author_id and/or artwork_id from params
    # Comments.where(user_id: user_id, artwork_id: artwork_id)
    # author_id = strong_params.author_id
    # artwork_id = strong_params.artwork_id
# debugger
    if strong_params.values.any?{|value| !value.nil?}
      render json: Comment.where(strong_params)
    else
      render plain: "Comment #{strong_params} not found!", status: 404
    end
  end

  def create
    comment = Comment.new(strong_params_for_create)

    if comment.save
      render json: comment
    else
      render json: comment.errors.full_messages, status: 422
    end
  end

  def destroy
    comment = Comment.find_by(id: params[:id])

    if comment
      if comment.destroy
        render json: comment
      else
        render comment.errors.full_messages, status: 422
      end
    else
      render plain: "Comment #{strong_params} not found!", status: 404
    end
  end

  def destroy_by_strong_params
    artwork_id = strong_params[:artwork_id]
    author_id = strong_params[:author_id]
    comment = Comment.find_by(artwork_id: artwork_id, author_id: author_id)

    if comment
      if (comment.destroy)
        render json: comment
      else
        render json: comment.errors.full_messages, status: 422
      end
    else
      render plain: "Comment (artwork_id: #{artwork_id} & author_id: #{author_id}) not found", status: 404
    end
  end

  private
  def strong_params
    params.require(:comment).permit(:author_id, :artwork_id)
  end

  def strong_params_for_create
    params.require(:comment).permit(:author_id, :artwork_id, :body)
  end
end
