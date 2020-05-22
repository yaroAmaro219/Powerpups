Rails.application.routes.draw do

 

  # =============== AUTH ===============
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  # =============== USERS ==============
  resources :users
  resources :squads do
    resources :posts
    resources :members
    resources :events
  end
  resources :events
end
