require 'rails_helper'

RSpec.feature('Create card', js: true) do
  context('A logged-in user') do
    scenario('enters a word and a card is created') do
      user = create(:user)

      allow_any_instance_of(ApplicationController)
        .to receive(:current_user)
        .and_return(user)

      visit root_path

      expect(page).to have_content('Creation Mode')

      fill_in('text', with: 'Merci')
      click_on('Create')

      expect(current_path).to eq(root_path)

      within('.new-card') do
        expect(page).to have_content('merci')
      end
    end
  end
end
