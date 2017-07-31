$(() => {
  fetchDecks()
  $('body').on('click', '.list-group-item', fetchDeckCards)
})

const fetchDeckCards = (e) => {
  const deckID = e.target.closest('.deck').dataset.id
  $.ajax({
    type: 'GET',
    url: `/api/v1/decks/${deckID}`,
    dataType: 'json'
  }).then((cards) => {
    let count = cards.length

    updateDeckBadge(count, e.target)

    $('.card-list').empty()
    
    cards.forEach((card) => {
      const cardObject = new Card(card)
      cardObject.appendToStudyPage()
    })

  }).fail(displayFailure)
}

const updateDeckBadge = (count, target) => {
  let deckButtons = document.getElementsByClassName('list-group-item')

  deckButtons = Array.from(deckButtons)

  deckButtons.forEach((button) => {
    button.children[0].outerHTML=`<span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span>`
  })

  target.children[0].outerHTML=`<span class="badge badge-default badge-pill">${count}</span>`
}

const fetchDecks = () => {
  $.ajax({
    type: 'GET',
    url: '/api/v1/decks',
    dataType: 'json'
  }).then((decks) => {
    Deck.createDecks(decks)
  }).fail(displayFailure)
}

const displayFailure = (failureData) => {
  console.log(`FAILED attempt for Deck resource: ${failureData.responseText}`)
}
