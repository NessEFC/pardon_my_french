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
    cards.forEach((card) => {
      const cardObject = new Card(card)
      cardObject.appendToStudyPage()
    })

  }).fail(displayFailure)
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