FactoryGirl.define do
  factory :user do
    first_name 'Bilbo'
    last_name 'Baggins'
    email 'bagginsjamz@example.com'
    password_digest 'password'
    password_confirmation 'password'
  end
end
