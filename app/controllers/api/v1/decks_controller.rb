class Api::V1::DecksController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    @decks = current_user.decks.distinct
    render json: @decks, status: 201
  end

end
