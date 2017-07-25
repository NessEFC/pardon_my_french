class Api::V1::CardsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    @card = Card.new(card_params)
    if @card.save
      render status: 201,
      json: {
        message: "Successfully created a card.",
        card: @card
      }.to_json
    else
      render status: 404,
      json: {
        message: "Card could not be created."
      }.to_json
    end
  end

  private

    def card_params
      params.require(:card).permit(:french_word, :personal_connection).merge(user_id: current_user.id)
    end

end
