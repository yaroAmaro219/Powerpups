Rails.application.routes.draw do
  

  # =============== AUTH ===============
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  resources :users
  post '/users', to: 'users#post'
  
end
