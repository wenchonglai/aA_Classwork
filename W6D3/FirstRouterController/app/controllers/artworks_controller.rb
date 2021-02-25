class ArtworksController < ApplicationController
  # def index
  #   render json: Artwork.all
  # end

  def index
    user = User.find_by(id: params[:id])

    if user
      render json: {owned: user.artworks, shared: user.shared_artworks}
    else
      redirect_to "/users/#{params[:id]}"
    end
  end

  def create
    artwork = Artwork.new(artwork_params)

    if artwork.save
      render json: artwork
    else
      render json: artwork.errors.full_messages, status: 422
    end
  end

  def show
    artwork = Artwork.find_by(id: params[:id])
    
    if artwork
      render json: artwork
    else
      render plain: "Artwork#{params[:id]} not found", status: 422
    end
  end

  def update
    artwork = Artwork.find_by(id: params[:id])
    
    if artwork
      artwork.update(artwork_params)
      render json: artwork
    else
      redirect_to "/artworks/#{params[:id]}"
    end
  end

  def destroy
    artwork = Artwork.find_by(id: params[:id])

    if artwork
      artwork.destroy
      redirect_to "/artworks"
    else
      redirect_to "/artworks/#{params[:id]}"
    end
  end

  private 
  def artwork_params
    params.require(:artwork).permit(:title, :image_url, :artist_id)
  end
end
