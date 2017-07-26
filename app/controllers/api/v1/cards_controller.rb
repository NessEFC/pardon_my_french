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
      if Card.find_by(french_word: card_params[:french_word])
        render status: 404,
        json: {
          message: 'You have already created a Card for this french word.'
        }.to_json
      else
        render status: 404,
        json: {
          message: 'You forgot to include a French word.'
        }.to_json
      end
    end
  end

  def update
    @card = Card.find(params[:id])
    if @card.update_attributes(card_params)
      render json: @card, status: 201
    else
      render json: @card.errors.full_messages, status: 500
    end
  end

  def destroy
    @card = Card.find(params[:id])
    if @card.destroy
      render json: {
        status: 204,
        message: 'Successfully deleted the record.'
      }
    else
      render json: {
        status: 400,
        message: 'Something went wrong, could not delete the record.'
      }
    end
  end

  private

    def card_params
      params.require(:card).permit(:french_word, :english_word, :personal_connection, :deck_id).merge(user_id: current_user.id)
    end

end
