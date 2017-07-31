class Card {
  constructor(card) {
    this.id = card.id
    this.french_word = card.french_word
    this.english_word = card.english_word
    this.personal_connection = card.personal_connection
    this.user_id = card.user_id
  }

  static checkForCard(e) {
    e.preventDefault()

    if($('.word').length === 0) {
      Card.createCard(e)
    } else {
      $('.creation-mode-container').prepend(`
        <div class="alert alert-warning">
          <strong>Oops! </strong>You must keep or discard your current card first.
        </div>
      `)

      Card.clearAlert()
    }
  }

  static clearAlert() {
    window.setTimeout(() => {
      $('.alert').fadeTo(500, 0).slideUp(500, () => {
        $('.alert').remove()
      })
    }, 5000)
  }

  static createCard(e) {
    const frenchWord = $('input[name="card[french_word]"]').val().toLowerCase()
    const englishWord = $('input[name="card[english_word]"]').val().toLowerCase()
    const connection = $('textarea[name="card[personal_connection]"]').val()
    const deckName = $('#deck-input').val().toLowerCase()
    let deckID = $("#decks-list option[value='"+deckName+"']").data('id')
    if(typeof deckID === 'undefined') {
      deckID = deckName
    }

    $.ajax({
      type: 'POST',
      url: '/api/v1/cards',
      dataType: 'json',
      data: {
        card:
          {
            french_word: frenchWord,
            english_word: englishWord,
            personal_connection: connection,
            deck_id: deckID
          }
      },
      success: ((data) => {
        const card = new Card(data.card)
        card.appendToPage(deckName)
        $('input[name="card[french_word]"]').val('')
        $('input[name="card[english_word]"]').val('')
        $('textarea[name="card[personal_connection]"]').val('')
        $('#deck-input').val('')
      }),
      error: ((data) => {
        $('.creation-mode-container').prepend(`
          <div class="alert alert-warning">
            <strong>Oops! </strong>${data.responseJSON.message}
          </div>
        `)

        Card.clearAlert()
      })
    })
  }

  appendToPage(deckName) {
    $('.new-card').append(`
      <div class="word" data-id="${this.id}">
        <p class="card-french-word" contenteditable="true">${this.french_word}</p>
        <p class="card-english-word" contenteditable="true">${this.english_word}</p>
        <p class="card-connection" contenteditable="true">${this.personal_connection}</p>
        <p class="card-deck-name">${deckName}</p>
        <input type="submit" class="btn btn-success" id="keep-btn" value="Keep & Store">
        <input type="submit" class="btn btn-danger" id="discard-btn" value="Discard">
      </div>
    `)
  }

  appendToStudyPage() {
    $('.card-list').append(`
      <div class="word study-card" data-id="${this.id}">
        <p class="card-french-word">${this.french_word}</p>
        <p class="card-english-word">${this.english_word}</p>
        <p class="card-connection">${this.personal_connection}</p>
      </div>
    `)
  }

  static update(e) {
    const id = parseInt(e.target.parentElement.dataset.id)
    const payload = e.target.innerText
    const payloadType = e.target.className
    let key

    if(payloadType === 'card-french-word') {
      key = 'french_word'
    } else if(payloadType === 'card-english-word') {
      key = 'english_word'
    } else {
      key = 'personal_connection'
    }

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

  static delete(e) {
    e.preventDefault()

    const id = parseInt(e.target.parentElement.dataset.id)

    $.ajax({
      type: 'DELETE',
      url: `/api/v1/cards/${id}`,
      dataType: 'json',
      success: ((data) => {
        $('.new-card').empty()
      })
    })
  }

  static keep(e) {
    $('.word').remove()
  }
}
