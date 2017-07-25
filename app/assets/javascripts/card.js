class Card {
  constructor(card) {
    this.id = card.id
    this.french_word = card.french_word
    this.user_id = card.user_id
  }

  static createCard(e) {
    e.preventDefault()

    $('.new-card').empty()

    const word = $('input[name="card[french_word]"]').val().toLowerCase()

    $.ajax({
      type: 'POST',
      url: '/api/v1/cards',
      dataType: 'json',
      data: {
        card:
          {
            french_word: word
          }
      },
      success: function(data) {
        const card = new Card(data.card)
        card.appendToPage()
        $('input[name="card[french_word]"]').val('')
      },
      error: function(data) {}
    })
  }

  appendToPage() {
    $('.new-card').append(`
      <div class="word">
        <p>${this.french_word}</p>
      </div>
    `)
  }
}
