Rails.application.routes.draw do

  # =============== AUTH ===============
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  # =============== USERS ==============
  resources :users
  resources :squads
  resources :users do
    resources :squads
  end
end
