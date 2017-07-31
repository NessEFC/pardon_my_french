require 'rails_helper'

RSpec.feature('Study mode:') do
  context('An authenticated user') do
    scenario('can view study mode') do
      user = create(:user)

      allow_any_instance_of(ApplicationController)
        .to receive(:current_user)
        .and_return(user)

      visit root_path
      click_on 'Study Mode'

      expect(current_path).to eq(cards_path)
    end
  end
end
