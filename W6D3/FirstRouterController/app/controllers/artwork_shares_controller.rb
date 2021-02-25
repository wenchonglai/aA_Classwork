class ArtworkSharesController < ApplicationController
  def create
    artwork_share = ArtworkShare.new(strong_params)

    if artwork_share.save
      render json: artwork_share
    else
      render json: artwork_share.errors.full_messages, status: 422
    end
  end

  def destroy
    artwork_share = ArtworkShare.find_by(id: params[:id])

    if artwork_share
      artwork_share.destroy
      render json: artwork_share
    else
      render plain: "artwork_share#{params[:id]}(artwork_id: #{:artwork_id} & viewer_id: #{viewer_id}) not found", status: 422
    end
  end

  private
  def strong_params
    params.require(:artwork_share).permit(:artwork_id, :viewer_id)
  end
end
