class DecksController < ApplicationController

  def index
    @decks = current_user.decks.distinct
  end

end
