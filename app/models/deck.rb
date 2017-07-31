class Deck < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :cards
  has_one :user, through: :cards
end
