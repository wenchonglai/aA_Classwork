class PostsController < ApplicationController
  before_action :ensure_logged_in, only: [:new, :create, :edit, :update, :delete]

  def new
    @post = Post.new
  end

  def create
    
    @post = Post.new(
      title: post_params[:title],
      url: post_params[:url],
      content: post_params[:content],
      author_id: current_user.id
    )

    @post.sub_ids = post_params[:sub_ids];

    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def edit
    @post = Post.find_by(id: params[:id])
  end

  def update

    @post = Post.find_by(id: params[:id])
    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit
    end

  end

  def destroy
    @post = Post.find_by(id: params[:id])
    @post.destroy
    redirect_to user_url(self.current_user)
  end

  def index
    @posts = Post.find_by(sub_id: params[:sub_id])
  end

  def show
    @post = Post.find_by(id: params[:id])
  end

  private
  
  def post_params
    params.require(:post).permit(:title, :url, :content, sub_ids: [])
  end

end
