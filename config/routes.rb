Rails.application.routes.draw do
 
  resources :users
  post '/auth/login', to: 'authentication#login'
	get '/auth/verify', to: 'authentication#verify'
end
