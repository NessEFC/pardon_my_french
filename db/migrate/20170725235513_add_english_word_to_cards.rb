class AddEnglishWordToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :english_word, :string
  end
end
