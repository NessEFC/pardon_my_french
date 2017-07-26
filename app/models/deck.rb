class Deck < ApplicationRecord
  validates :name, presence: true, uniqueness: true
end
