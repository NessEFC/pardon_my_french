class Card < ApplicationRecord
  validates :french_word, presence: true, uniqueness: true

  belongs_to :user
end
