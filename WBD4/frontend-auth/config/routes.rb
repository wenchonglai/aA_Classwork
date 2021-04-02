# zsyzyork@Possum frontend-auth % brails routes
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#           api_user_chirps GET    /api/users/:user_id/chirps(.:format)                                                     api/chirps#index {:format=>:json}
#                 api_users GET    /api/users(.:format)                                                                     api/users#index {:format=>:json}
#                           POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#              new_api_user GET    /api/users/new(.:format)                                                                 api/users#new {:format=>:json}
#             edit_api_user GET    /api/users/:id/edit(.:format)                                                            api/users#edit {:format=>:json}
#                  api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:format=>:json}
#                           PATCH  /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                           PUT    /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                           DELETE /api/users/:id(.:format)                                                                 api/users#destroy {:format=>:json}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#                api_search POST   /api/search(.:format)                                                                    api/users#search {:format=>:json}
#                api_chirps GET    /api/chirps(.:format)                                                                    api/chirps#index {:format=>:json}
#                           POST   /api/chirps(.:format)                                                                    api/chirps#create {:format=>:json}
#             new_api_chirp GET    /api/chirps/new(.:format)                                                                api/chirps#new {:format=>:json}
#            edit_api_chirp GET    /api/chirps/:id/edit(.:format)                                                           api/chirps#edit {:format=>:json}
#                 api_chirp GET    /api/chirps/:id(.:format)                                                                api/chirps#show {:format=>:json}
#                           PATCH  /api/chirps/:id(.:format)                                                                api/chirps#update {:format=>:json}
#                           PUT    /api/chirps/:id(.:format)                                                                api/chirps#update {:format=>:json}
#                           DELETE /api/chirps/:id(.:format)                                                                api/chirps#destroy {:format=>:json}
#                 api_likes POST   /api/likes(.:format)                                                                     api/likes#create {:format=>:json}
#                           DELETE /api/likes(.:format)                                                                     api/likes#destroy {:format=>:json}
#               api_follows POST   /api/follows(.:format)                                                                   api/follows#create {:format=>:json}
#                api_follow DELETE /api/follows/:id(.:format)                                                               api/follows#destroy {:format=>:json}
#                      root GET    /                                                                                        root#root

Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users do
      resources :chirps, only: [:index]
    end

    resource :session, only: [:create, :destroy]

    post '/search', to: 'users#search'

    resources :chirps
    resources :likes, only: [:create]
    delete '/likes', to: 'likes#destroy'
    resources :follows, only: [:create, :destroy]
  end
  root to: 'root#root'
end
