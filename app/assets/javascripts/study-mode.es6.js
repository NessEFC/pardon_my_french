$(() => {
  fetchDecks()
})

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
