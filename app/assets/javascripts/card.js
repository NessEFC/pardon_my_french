class Card {
  constructor(card) {
    this.id = card.id
    this.french_word = card.french_word
    this.personal_connection = card.personal_connection
    this.user_id = card.user_id
  }

  static createCard(e) {
    e.preventDefault()

    $('.new-card').empty()

    const word = $('input[name="card[french_word]"]').val().toLowerCase()
    const connection = $('textarea[name="card[personal_connection]"]').val()

    $.ajax({
      type: 'POST',
      url: '/api/v1/cards',
      dataType: 'json',
      data: {
        card:
          {
            french_word: word,
            personal_connection: connection
          }
      },
      success: ((data) => {
        const card = new Card(data.card)
        card.appendToPage()
        $('input[name="card[french_word]"]').val('')
        $('textarea[name="card[personal_connection]"]').val('')
      }),
      error: ((data) => {})
    })
  }

  appendToPage() {
    $('.new-card').append(`
      <div class="word" data-id="${this.id}">
        <p class="card-french-word" contenteditable="true">${this.french_word}</p>
        <p class="card-connection" contenteditable="true">${this.personal_connection}</p>
      </div>
    `)
  }

  static update(e) {
    const id = parseInt(e.target.parentElement.dataset.id)
    const payload = e.target.innerText
    const payloadType = e.target.className

    const key = (payloadType === 'card-french-word') ? 'french_word' : 'personal_connection'
    let options = {}
    options[key] = payload

    $.ajax({
      type: 'PUT',
      url: `/api/v1/cards/${id}`,
      dataType: 'json',
      data: {
        card: options
      }
    })
  }
}
