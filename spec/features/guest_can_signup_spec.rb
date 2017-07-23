require 'rails_helper'

RSpec.feature('Sign-up') do
  context('As an unauthenticated user') do
    scenario('they can sign-up') do
      visit root_path

      expect(current_path).to eq(login_path)
      expect(page).to have_content('Login')
      click_on('Sign me up!')

      expect(current_path).to eq(new_user_path)
      fill_in("user[first_name]", with: 'Craig')
      fill_in("user[last_name]", with: 'Ness')
      fill_in("user[email]", with: 'craig@example.com')
      fill_in("user[password]", with: 'password')
      fill_in("user[password_confirmation]", with: 'password')
      click_on 'Sign Up'

      expect(current_path).to eq(root_path)

      user = User.last
      expect(user.first_name).to eq('Craig')
      expect(user.last_name).to eq('Ness')
      expect(user.email).to eq('craig@example.com')
      expect(user.password_digest).not_to be_empty
      expect(page).to have_content("Thanks for joining #{user.first_name}, let's get started!")
      expect(page).to have_link('Logout')
    end

    scenario('first name is not present') do
      visit new_user_path

      fill_in("user[last_name]", with: 'Ness')
      fill_in("user[email]", with: 'craig@example.com')
      fill_in("user[password]", with: 'password')
      fill_in("user[password_confirmation]", with: 'password')
      click_on 'Sign Up'

      expect(current_path).to eq(new_user_path)
      expect(page).to have_content('First name can\'t be blank')
    end

    scenario('email is not unique') do
      user = create(:user, email: 'craig@example.com')

      visit new_user_path

      fill_in("user[first_name]", with: 'Craig')
      fill_in("user[last_name]", with: 'Ness')
      fill_in("user[email]", with: 'craig@example.com')
      fill_in("user[password]", with: 'password')
      fill_in("user[password_confirmation]", with: 'password')
      click_on 'Sign Up'

      expect(current_path).to eq(new_user_path)
      expect(page).to have_content("Email has already been taken")
    end

    scenario('email is not present') do
      visit new_user_path

      fill_in("user[first_name]", with: 'Craig')
      fill_in("user[last_name]", with: 'Ness')
      fill_in("user[password]", with: 'password')
      fill_in("user[password_confirmation]", with: 'password')
      click_on 'Sign Up'

      expect(current_path).to eq(new_user_path)
      expect(page).to have_content("Email can't be blank")
    end

    scenario('password is not present') do
      visit new_user_path

      fill_in("user[first_name]", with: 'Craig')
      fill_in("user[last_name]", with: 'Ness')
      fill_in("user[email]", with: 'craig@example.com')
      fill_in("user[password_confirmation]", with: 'password')
      click_on 'Sign Up'

      expect(current_path).to eq(new_user_path)
      expect(page).to have_content("Password can't be blank")
    end

    scenario('password confirmation is not present') do
      visit new_user_path

      fill_in("user[first_name]", with: 'Craig')
      fill_in("user[last_name]", with: 'Ness')
      fill_in("user[email]", with: 'craig@example.com')
      fill_in("user[password]", with: 'password')
      click_on 'Sign Up'

      expect(current_path).to eq(new_user_path)
      expect(page).to have_content("Password confirmation doesn't match Password")
    end

    scenario('password confirmation doesn\'t match password') do
      visit new_user_path

      fill_in("user[first_name]", with: 'Craig')
      fill_in("user[last_name]", with: 'Ness')
      fill_in("user[email]", with: 'craig@example.com')
      fill_in("user[password]", with: 'password')
      fill_in("user[password_confirmation]", with: 'Password')
      click_on 'Sign Up'

      expect(current_path).to eq(new_user_path)
      expect(page).to have_content("Password confirmation doesn't match Password")
    end
  end
end
