FactoryGirl.define do
  factory :user do
    first_name 'Bilbo'
    last_name 'Baggins'

    sequence :email do |n|
      "baggins#{n}@example.com"
    end

    password 'password'
    password_confirmation 'password'
  end
end
