Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources :users
  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show'
  get '/users/new', to: 'users#new', as: 'new_user'
  get '/users/:id/edit', to: 'users#edit'
  post '/users', to: 'users#create'
  patch '/users/:id', to: 'users#update'
  delete '/users/:id', to: 'users#destroy'


  resources :users do 
    member do 
      get 'artworks', to: 'artworks#index'
      post 'like', to: 'likes#like'
      delete 'like', to: 'likes#unlike'
    end
  end
  resources :artworks, except: [:index]

  delete '/artwork_shares', to: 'artwork_shares#delete_by_strong_params'
  resources :artwork_shares, only: [:create, :destroy]

  delete '/comments', to: 'comments#destroy_by_strong_params'
  resources :comments, only: [:create, :destroy, :index]
 
  # post '/users/:id/artworks/:artwork_id/like', to: 'likes#like'
  # post '/users/:id/comments/:comment_id/like', to: 'likes#like'
  # delete '/users/:id/artworks/:artwork_id/unlike', to: 'likes#unlike'
  # delete '/users/:id/comments/:comment_id/unlike', to: 'likes#unlike'
end
