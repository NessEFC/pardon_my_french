class User < ApplicationRecord
  validates :first_name, :email, presence: true
  validates :email, uniqueness: true

  has_secure_password

  has_many :cards
end
