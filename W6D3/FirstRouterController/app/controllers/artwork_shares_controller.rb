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
      if (artwork_share.destroy)
        render json: artwork_share
      else
        render plain: "Cannot delete artwork_share(artwork_id: #{artwork_share[:artwork_id]} & viewer_id: #{artwork_share[:viewer_id]})", status: 422
      end
    else
      render plain: "artwork_share#{params[:id]} not found", status: 404
    end
  end

  #delete './artwork_shares/?artwork_share[artwork_id]=1&artwork_share[viewer_id]=20'
  def delete_by_strong_params
    artwork_id = strong_params[:artwork_id]
    viewer_id = strong_params[:viewer_id]
    artwork_share = ArtworkShare.find_by(artwork_id: artwork_id, viewer_id: viewer_id)

    if artwork_share
      if (artwork_share.destroy)
        render json: artwork_share
      else
        render plain: "Cannot delete artwork_share(artwork_id: #{artwork_id} & viewer_id: #{viewer_id})", status: 422
      end
    else
      render plain: "artwork_share#{params[:id]}(artwork_id: #{artwork_id} & viewer_id: #{viewer_id}) not found", status: 404
    end
  end

  private
  def strong_params
    # {artwork_share: {artwork_id: val1, viewer_id: val2}} => {artwork_id: val1, viewer_id: val2}
    params.require(:artwork_share).permit(:artwork_id, :viewer_id)
  end
end
