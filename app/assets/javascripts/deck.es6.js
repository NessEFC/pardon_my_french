class Deck {
  constructor(deck) {
    this.id = deck.id
    this.name = deck.name
  }

  static createDecks(decks) {
    decks.map((deck) => {
      const deckObject = new Deck(deck)
      deckObject.appendToPage()
    })
  }

  appendToPage() {
    $('.deck-list').prepend(`
      <div class="deck" data-id="${this.id}">
        <button type="button" class="list-group-item list-group-item-action justify-content-between">${this.name}</button>
      </div>
    `)
  }
}
