require 'rails_helper'

RSpec.feature('Create card', type: :feature, js: true) do
  context('A logged-in user') do
    scenario('enters a word and connection and a card is created') do
      skip
      user = create(:user)

      allow_any_instance_of(ApplicationController)
        .to receive(:current_user)
        .and_return(user)

      visit root_path

      expect(page).to have_content('Creation Mode')

      fill_in('card[french_word]', with: 'Merci')
      fill_in('card[personal_connection]', with: 'Respond with this when the waiter brings your food')
      click_on('Create')

      sleep 2

      expect(current_path).to eq(root_path)

      within('.new-card') do
        expect(page).to have_content('merci')
        expect(page).to have_content('Respond with this when the waiter brings your food')
      end

      card = Card.last

      expect(card.id).to eq(1)
      expect(card.french_word).to eq('merci')
      expect(card.personal_connection).to eq('Respond with this when the waiter brings your food')
      expect(card.user_id).to eq(1)
    end
  end
end
