require 'rails_helper'

RSpec.feature('Text parsing') do
  context('A logged-in user') do
    scenario('enters text and the words display on the page') do
      user = create(:user)

      allow_any_instance_of(ApplicationController)
        .to receive(:current_user)
        .and_return(user)

      visit root_path

      expect(page).to have_content('Creation Mode')
      expect(page).to have_css('input[type=textarea]')
      expect(page).to have_button('Build My Cards')

      fill_in('text', with: 'Je vous remercie grandement.')
      click_on('Build My Cards')

      expect(current_path).to eq(root_path)

      within('.words') do
        expect(page.find('li:nth-child(1)')).to have_content 'Je'
        expect(page.find('li:nth-child(2)')).to have_content 'vous'
        expect(page.find('li:nth-child(3)')).to have_content 'remercie'
        expect(page.find('li:nth-child(4)')).to have_content 'grandement'
      end
    end
  end
end
