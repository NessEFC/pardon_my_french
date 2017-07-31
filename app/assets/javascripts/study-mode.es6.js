$(() => {
  fetchDecks()
  $('body').on('click', '.list-group-item', fetchDeckCards)
  $('#next-card-btn').on('click', displayNextCard)
})

const displayNextCard = (e) => {
  let studyCards = $('.study-card').toArray()
  let showPosition

  studyCards.forEach((card, index) => {
    if($(card).is(':visible')) {
      $(card).hide()
      showPosition = index + 1
    }
  })

  $(studyCards[showPosition]).show()

  if(showPosition === studyCards.length) {
    $(studyCards[showPosition - 1]).hide()
    $(studyCards[0]).show()
  }
}

const fetchDeckCards = (e) => {
  const deckID = e.target.closest('.deck').dataset.id
  $.ajax({
    type: 'GET',
    url: `/api/v1/decks/${deckID}`,
    dataType: 'json'
  }).then((cards) => {
    let count = cards.length
    updateDeckBadge(count, e.target)

    $('.card-list').find('*').not('#next-card-btn').remove();

    cards.forEach((card) => {
      const cardObject = new Card(card)
      cardObject.appendToStudyPage()
    })

    $('.word').not(':first').hide()

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
