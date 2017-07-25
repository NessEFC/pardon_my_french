class Card {
  constructor(card) {
    this.id = card.id
    this.french_word = card.french_word
    this.user_id = card.user_id
  }

  appendToPage() {
    $('.new-card').append(`
      <div class="word">
        <p>${this.french_word}</p>
      </div>
    `)
  }
}
