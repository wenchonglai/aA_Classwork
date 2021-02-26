class LikesController < ApplicationController
    def like 
        liker_id = params[:id]
        type = strongparams[:type]
        likee_id = strongparams[:id]
        # artwork = Artwork.find_by(id: params[:artwork_id])
        # comment = Comment.find_by(id: params[:comment_id])
        if type.downcase == 'artwork'

            like = Like.new(liker_id: liker_id, likee: Artwork.find_by(id: likee_id))
        elsif type.downcase == "comment" 
            like = Like.new(liker_id: liker_id, likee: Comment.find_by(id: likee_id))
        end
        if like 
            if like.save 
                render json: like 
            else 
                render json: like.errors.full_messages, status: 422 
            end
        else 
            render plain: "Please provide the correct ids for user, artwork and/or comment"
        end
    end

    def unlike 
        liker_id = params[:id]
        type = strongparams[:type]
        likee_id = strongparams[:id]
        # artwork = Artwork.find_by(id: params[:artwork_id])
        # comment = Comment.find_by(id: params[:comment_id])
        if type.downcase == 'artwork'

            like = Like.find_by(liker_id: liker_id, likee: Artwork.find_by(id: likee_id))
        elsif type.downcase == "comment" 
            like = Like.find_by(liker_id: liker_id, likee: Comment.find_by(id: likee_id))
        end
        if like 
            if like.destroy 
                render json: like 
            else 
                render json: like.errors.full_messages, status: 422 
            end
        else 
            render plain: "Please provide the correct ids for user, artwork and/or comment"
        end
    end

    private 
    def strongparams 
        params.require(:like).permit(:type, :id) 
    end
end
