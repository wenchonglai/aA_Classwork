class CatsController < ApplicationController
  def initialize
    @colors = Cat::COLORS
    super
  end

  def index
    @cats = Cat.all
    render :index
  end

  def show
    @cat = Cat.find_by(id: params[:id])

    if @cat#.save
      render :show
    else
      render "not-found", status: 404
      # render plain: "invalid cat!"
      # redirect_to cats_url #-> "99cats.com/cats"
    end
  end

  def new
    render :new
  end
  
  def create
    @cat = Cat.new(strong_params)

    if @cat.save
      redirect_to cat_url(@cat)
    else
      render :new
    end
  rescue
    render :new
  end

  def edit
    @cat = Cat.find_by(id: params[:id])

    if @cat
      render :edit
    else
      render "not-found", status: 404
    end
  end

  def update

  end

  private
  def strong_params
    params.require(:cat).permit(:name, :sex, :color, :birth_date, :description)
  end
end
