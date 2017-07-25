require 'rails_helper'

RSpec.feature('Create card', type: :feature, js: true) do
  context('A logged-in user') do
    scenario('enters a word and a card is created') do
      skip
      user = create(:user)

      allow_any_instance_of(ApplicationController)
        .to receive(:current_user)
        .and_return(user)

      visit root_path

      expect(page).to have_content('Creation Mode')

      fill_in('card[french_word]', with: 'Merci')
      click_on('Create')

      sleep 2

      expect(current_path).to eq(root_path)

      within('.new-card') do
        expect(page).to have_content('merci')
      end

      card = Card.last

      expect(card.id).to eq(1)
      expect(card.french_word).to eq('merci')
      expect(card.user_id).to eq(1)
    end
  end
end
