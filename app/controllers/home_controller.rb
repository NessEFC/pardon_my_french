class HomeController < ApplicationController

  def index
    redirect_to login_path if !current_user
    @decks = Deck.all
  end

end
