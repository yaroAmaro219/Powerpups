class SquadsController < ApplicationController
  before_action :set_squad, only: [:show, :update, :destroy]
  before_action :authorize_request, except: [:create, :index]

  # GET /squads
  def index
    @squads = Squad.all

    render json: @squads
  end

  # GET /squads/1
  def show
    render json: @squad
  end

  # POST /squads
  def create
    @squad = Squad.new(squad_params)

    if @squad.save
      render json: @squad, status: :created, location: @squad
    else
      render json: @squad.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /squads/1
  def update
    if @squad.update(squad_params)
      render json: @squad
    else
      render json: @squad.errors, status: :unprocessable_entity
    end
  end

  # DELETE /squads/1
  def destroy
    @squad.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_squad
      @squad = Squad.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def squad_params
      params.require(:squad).permit(:name, :users)
    end
end
